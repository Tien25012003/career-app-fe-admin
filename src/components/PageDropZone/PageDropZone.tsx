import { EFileType } from '@enum/file.enum';
import { DropzoneProps } from '@mantine/dropzone';

interface PageDropZoneProps extends DropzoneProps {
  maxSize?: number;
  acceptType?: EFileType[];
}
export default function PageDropZone() {
  return <div>PageDropZone</div>;
}
