import { Component, ElementRef, forwardRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';

@Component({
  selector: 'dimakorotkov-ngx-json-editor',
  template: `
    <div #container></div>
  `,
  styles: [
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgxJsonEditorComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: NgxJsonEditorComponent, //forwardRef(() => NgxJsonEditorComponent),
      multi: true,
    }
  ],
})
export class NgxJsonEditorComponent implements OnInit, ControlValueAccessor, OnDestroy, Validator {

  @Input() options!: JSONEditorOptions<any>;

  @ViewChild('container', { static: true }) container!: ElementRef;

  private editor?: JSONEditor<any>;
  private onChange?: any;
  private onTouched?: any;

  ngOnDestroy(): void {
    if (this.editor) {
      this.editor.destroy();
      delete this.editor;
    }
  }

  writeValue(obj: any): void {
    if (this.editor) {
      this.editor.setValue(obj);
    } else {
      throw new Error('Editor was not initalized.');
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnInit(): void {
    if (this.container.nativeElement) {
      if (this.options) {
        this.editor = new JSONEditor(this.container.nativeElement, this.options);
        this.editor.on('change', () => {
          if (this.editor && this.onChange) {
            this.onChange(this.editor.getValue());
          }
        });
      } else {
        throw new Error(`Set the options parameter for json-editor.`);  
      }
    } else {
      throw new Error(`Can't find the ElementRef reference for json-editor.`);
    }
  }

  setDisabledState?(isDisabled: boolean): void {
    if (this.editor) {
      if (isDisabled) {
        this.editor.disable();
      } else {
        this.editor.enable();
      }
    }
  }

  validate(control: AbstractControl): ValidationErrors | null {
    let result: ValidationErrors | null = null;
    if (this.editor) {
      const errors = this.editor.validate(control.value);
      if (errors.length) {
        result = {};
        for (let i = 0; i < errors.length; i++) {
          result[i] = errors[i];
        }
      }
    }
    return result;
  }

}
