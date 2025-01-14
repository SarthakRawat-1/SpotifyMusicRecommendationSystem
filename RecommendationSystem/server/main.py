from flask import Flask, render_template, request
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from flask_cors import CORS
import os

# Assuming clustered_data.csv is in the same folder as main.py
base_dir = os.path.dirname(os.path.abspath(__file__))
file_path = os.path.join(base_dir, "clustered_data.csv")

try:
    df = pd.read_csv(file_path)
    print("File loaded successfully")
except FileNotFoundError as e:
    print(f"Error: {e}")
    df = None

app = Flask(__name__)

CORS(app)

numerical_features = [
    "valence", "danceability", "energy", "tempo", "acousticness", "liveness", "speechiness", "instrumentalness"
]

def recommend_songs(song_name, df, num_recommendations=5):
    # Get Cluster for Input song
    song_cluster = df[df['name'] == song_name]['Cluster'].values[0]
    print(f"Song: {song_name}, Cluster: {song_cluster}")  # Debug

    # Filter all songs
    same_cluster_songs = df[df['Cluster'] == song_cluster]

    # Calculate similarity within same cluster
    song_index = same_cluster_songs[same_cluster_songs['name'] == song_name].index[0]
    print(f"Song Index: {song_index}")  # Debug
    cluster_features = same_cluster_songs[numerical_features]
    similarity = cosine_similarity(cluster_features, cluster_features)

    # Get Top Recommendations
    similar_songs = np.argsort(similarity[song_index])[-(num_recommendations + 1):-1][::-1]
    recommendations = same_cluster_songs.iloc[similar_songs][['name', 'year', 'artists']]

    return recommendations

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/recommend", methods=["POST"])
def recommend():
    recommendations = []

    if request.method == "POST":
        # Get the user's input
        song_name = request.form.get("song_name")

        try:
            recommendations = recommend_songs(song_name, df).to_dict(orient="records")
        except Exception as e:
            print(f"Error during recommendation: {e}")
            recommendations = [{"name": "Error", "artist": "Invalid", "year": "1071"}]

    return {"recommendations": recommendations}

if __name__ == '__main__':
    app.run(debug=True)