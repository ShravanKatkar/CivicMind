# Use official lightweight Python image
FROM python:3.10-slim

# Install system dependencies needed for OpenCV, Whisper (FFmpeg), and PyAudio
RUN apt-get update && apt-get install -y \
    build-essential \
    libgl1 \
    libglib2.0-0 \
    ffmpeg \
    portaudio19-dev \
    && rm -rf /var/lib/apt/lists/*

# Set up user for Hugging Face Spaces (requires UID 1000)
RUN useradd -m -u 1000 user
USER user
ENV HOME=/home/user \
    PATH=/home/user/.local/bin:$PATH \
    PYTHONPATH=/home/user/app

WORKDIR $HOME/app

# Pre-copy requirements.txt to leverage Docker build cache
COPY --chown=user backend/requirements.txt requirements.txt

# Install dependencies (use --no-cache-dir to reduce image size)
RUN pip install --no-cache-dir --upgrade -r requirements.txt

# Copy all application files
COPY --chown=user . .

# Run pre-download script to cache YOLOv8, BLIP, and Whisper models into the image
RUN python backend/scripts/download_models.py

# Expose port 7860 (Hugging Face default)
EXPOSE 7860

# Run Uvicorn server on port 7860
CMD ["uvicorn", "backend.api.main:app", "--host", "0.0.0.0", "--port", "7860"]
