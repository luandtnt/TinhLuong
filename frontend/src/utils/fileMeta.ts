import { FileMetadata } from '../types/content';

export async function extractFileMetadata(file: File): Promise<FileMetadata> {
  const metadata: FileMetadata = {
    fileName: file.name,
    fileSize: file.size,
    fileFormat: file.type || getFileExtension(file.name),
  };

  // Extract metadata based on file type
  if (file.type.startsWith('image/')) {
    const dimensions = await getImageDimensions(file);
    metadata.dimensions = dimensions;
  } else if (file.type.startsWith('video/')) {
    const videoMeta = await getVideoMetadata(file);
    metadata.duration = videoMeta.duration;
    metadata.resolution = videoMeta.resolution;
    metadata.thumbnailUrl = videoMeta.thumbnail;
  } else if (file.type.startsWith('audio/')) {
    const duration = await getAudioDuration(file);
    metadata.duration = duration;
  } else if (file.type === 'application/pdf') {
    // Mock PDF page count - in real app, use PDF.js
    metadata.pageCount = Math.floor(Math.random() * 200) + 10;
  }

  return metadata;
}

function getFileExtension(filename: string): string {
  const parts = filename.split('.');
  return parts.length > 1 ? parts[parts.length - 1].toUpperCase() : 'UNKNOWN';
}

function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ width: img.width, height: img.height });
    };
    
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve({ width: 0, height: 0 });
    };
    
    img.src = url;
  });
}

function getVideoMetadata(file: File): Promise<{ duration: number; resolution: string; thumbnail: string }> {
  return new Promise((resolve) => {
    const video = document.createElement('video');
    const url = URL.createObjectURL(file);
    
    video.onloadedmetadata = () => {
      const duration = Math.floor(video.duration);
      const resolution = `${video.videoWidth}x${video.videoHeight}`;
      
      // Create thumbnail
      video.currentTime = 1;
      video.onseeked = () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(video, 0, 0);
        const thumbnail = canvas.toDataURL('image/jpeg');
        
        URL.revokeObjectURL(url);
        resolve({ duration, resolution, thumbnail });
      };
    };
    
    video.onerror = () => {
      URL.revokeObjectURL(url);
      resolve({ duration: 0, resolution: '0x0', thumbnail: '' });
    };
    
    video.src = url;
  });
}

function getAudioDuration(file: File): Promise<number> {
  return new Promise((resolve) => {
    const audio = new Audio();
    const url = URL.createObjectURL(file);
    
    audio.onloadedmetadata = () => {
      URL.revokeObjectURL(url);
      resolve(Math.floor(audio.duration));
    };
    
    audio.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(0);
    };
    
    audio.src = url;
  });
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}
