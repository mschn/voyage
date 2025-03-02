import { File, getFileExtension } from './model';

export function getFileIcon(file: File): string {
  const ext = getFileExtension(file);
  if (ext) {
    return fileTypes[ext]?.icon ?? 'fa-file';
  }
  return 'fa-file';
}

export const ImageExtensions = ['png', 'jpg', 'jpeg', 'gif', 'svg'];
export const TextExtensions = [
  'css',
  'html',
  'ts',
  'sh',
  'js',
  'xml',
  'yml',
  'yaml',
  'md',
  'txt',
  'json',
];
export const PreviewExtensions = ['pdf', ...ImageExtensions, ...TextExtensions];

export function canPreviewFile(file: File) {
  const ext = getFileExtension(file);
  if (ext) {
    return PreviewExtensions.includes(ext);
  }
  return false;
}

export const fileTypes: Record<string, { icon: string; description: string }> =
  {
    css: { icon: 'fa-file-code', description: 'CSS Document' },
    csv: { icon: 'fa-file-lines', description: 'CSV Document' },
    doc: { icon: 'fa-file-word', description: 'Word Document' },
    docx: { icon: 'fa-file-word', description: 'Word Document' },
    gif: { icon: 'fa-file-video', description: 'GIF Image' },
    gz: { icon: 'fa-file-zipper', description: 'Archive' },
    html: { icon: 'fa-file-code', description: 'HTML Document' },
    jpeg: { icon: 'fa-file-image', description: 'JPG Image' },
    jpg: { icon: 'fa-file-image', description: 'JPG Image' },
    js: { icon: 'fa-file-code', description: 'Javascript Document' },
    json: { icon: 'fa-file-code', description: 'JSON Document' },
    log: { icon: 'fa-file-lines', description: 'Log Document' },
    md: { icon: 'fa-file-code', description: 'Markdown Document' },
    mov: { icon: 'fa-file-video', description: 'QuickTime Movie' },
    mp3: { icon: 'file-audio', description: 'MP3 Audio' },
    mp4: { icon: 'fa-file-video', description: 'MP4 Movie' },
    mpg: { icon: 'fa-file-video', description: 'MPEG Movie' },
    pdf: { icon: 'fa-file-pdf', description: 'PDF Document' },
    png: { icon: 'fa-file-image', description: 'PNG Image' },
    py: { icon: 'fa-file-code', description: 'Python Document' },
    sh: { icon: 'fa-file-code', description: 'Shell Script' },
    svg: {
      icon: 'fa-file-image',
      description: 'SVG Image',
    },
    tar: { icon: 'fa-file-zipper', description: 'Archive' },
    ts: { icon: 'fa-file-code', description: 'Typescript File' },
    txt: { icon: 'fa-file-lines', description: 'Plain Text' },
    xls: { icon: 'fa-file-excel', description: 'Excel Document' },
    xlsx: { icon: 'fa-file-excel', description: 'Excel Document' },
    xml: { icon: 'fa-file-code', description: 'XML Document' },
    yaml: { icon: 'fa-file-code', description: 'YAML Document' },
    yml: { icon: 'fa-file-code', description: 'YAM: Document' },
    zip: { icon: 'fa-file-zipper', description: 'Archive' },
  };
