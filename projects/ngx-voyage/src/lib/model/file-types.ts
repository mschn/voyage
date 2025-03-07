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
    css: { icon: 'fa-file-code', description: 'CSS_DOCUMENT' },
    csv: { icon: 'fa-file-lines', description: 'CSV_DOCUMENT' },
    doc: { icon: 'fa-file-word', description: 'WORD_DOCUMENT' },
    docx: { icon: 'fa-file-word', description: 'WORD_DOCUMENT' },
    gif: { icon: 'fa-file-video', description: 'GIF_IMAGE' },
    gz: { icon: 'fa-file-zipper', description: 'ARCHIVE' },
    html: { icon: 'fa-file-code', description: 'HTML_DOCUMENT' },
    jpeg: { icon: 'fa-file-image', description: 'JPG_IMAGE' },
    jpg: { icon: 'fa-file-image', description: 'JPG_IMAGE' },
    js: { icon: 'fa-file-code', description: 'JS_DOCUMENT' },
    json: { icon: 'fa-file-code', description: 'JSON_DOCUMENT' },
    log: { icon: 'fa-file-lines', description: 'LOG_DOCUMENT' },
    md: { icon: 'fa-file-code', description: 'MARKDOWN_DOCUMENT' },
    mov: { icon: 'fa-file-video', description: 'QUICKTIME_MOVIE' },
    mp3: { icon: 'file-audio', description: 'MP3_AUDIO' },
    mp4: { icon: 'fa-file-video', description: 'MP4_MOVIE' },
    mpg: { icon: 'fa-file-video', description: 'MPEG_MOVIE' },
    pdf: { icon: 'fa-file-pdf', description: 'PDF_DOCUMENT' },
    png: { icon: 'fa-file-image', description: 'PNG_IMAGE' },
    py: { icon: 'fa-file-code', description: 'PYTHON_DOCUMENT' },
    sh: { icon: 'fa-file-code', description: 'SHELL_SCRIPT' },
    svg: {
      icon: 'fa-file-image',
      description: 'SVG_IMAGE',
    },
    tar: { icon: 'fa-file-zipper', description: 'ARCHIVE' },
    ts: { icon: 'fa-file-code', description: 'TYPESCRIPT_FILE' },
    txt: { icon: 'fa-file-lines', description: 'PLAIN_TEXT' },
    xls: { icon: 'fa-file-excel', description: 'EXCEL_DOCUMENT' },
    xlsx: { icon: 'fa-file-excel', description: 'EXCEL_DOCUMENT' },
    xml: { icon: 'fa-file-code', description: 'XML_DOCUMENT' },
    yaml: { icon: 'fa-file-code', description: 'YAML_DOCUMENT' },
    yml: { icon: 'fa-file-code', description: 'YAML_DOCUMENT' },
    zip: { icon: 'fa-file-zipper', description: 'ARCHIVE' },
  };
