import {
  Component,
  ElementRef,
  HostListener,
  forwardRef,
  Input,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploadComponent),
      multi: true,
    },
  ],
})
export class FileUploadComponent implements ControlValueAccessor {
  @Input('reset') reset: boolean = false;
  public onChange = (_: any) => {};
  private file!: File | null;
  filename: string | undefined;

  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
    const file = event && event.item(0);
    this.onChange(file);
    this.file = file;
    this.filename = file?.name;
  }

  constructor(private host: ElementRef<HTMLInputElement>) {
    console.log(this.reset);
  }

  writeValue(value: null) {
    // clear file input
    this.host.nativeElement.value = '';
    this.file = null;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
    console.log(this.reset);
    if (this.reset) {
      this.file = null;
      this.filename = undefined;
    }
  }

  registerOnTouched(fn: Function) {}
}
