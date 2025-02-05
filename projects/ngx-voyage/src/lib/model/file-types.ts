import { File, getFileExtension } from './model';

export function getFileIcon(file: File): string {
  const ext = getFileExtension(file);
  return iconPerExtension[ext] ?? 'fa-file';
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
  return PreviewExtensions.includes(getFileExtension(file));
}

export const iconPerExtension: Record<string, string> = {
  css: 'fa-file-code',
  csv: 'fa-file-lines',
  doc: 'fa-file-word',
  docx: 'fa-file-word',
  gif: 'fa-file-video',
  gz: 'fa-file-zipper',
  html: 'fa-file-code',
  jpeg: 'fa-file-image',
  jpg: 'fa-file-image',
  js: 'fa-file-code',
  json: 'fa-file-code',
  log: 'fa-file-lines',
  md: 'fa-file-code',
  mov: 'fa-file-video',
  mp3: 'file-audio',
  mp4: 'fa-file-video',
  mpg: 'fa-file-video',
  pdf: 'fa-file-pdf',
  png: 'fa-file-image',
  py: 'fa-file-code',
  sh: 'fa-file-code',
  svg: 'fa-file-image',
  tar: 'fa-file-zipper',
  ts: 'fa-file-code',
  txt: 'fa-file-lines',
  xls: 'fa-file-excel',
  xlsx: 'fa-file-excel',
  xml: 'fa-file-code',
  yaml: 'fa-file-code',
  yml: 'fa-file-code',
  zip: 'fa-file-zipper',
};
