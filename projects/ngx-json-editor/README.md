# Ngx Json Editor

<span class="badge-patreon"><a href="https://www.patreon.com/dimakorotkov" title="Donate to this project using Patreon"><img src="https://img.shields.io/badge/patreon-donate-yellow.svg" alt="Patreon donate button" /></a></span>
<span><a href="https://buymeacoff.ee/NXR1ZkP" title="Donate to this project using Buy Me A Coffee" rel="nofollow"><img src="https://img.shields.io/badge/buy%20me%20a%20coffee-donate-yellow.svg" alt="Buy Me A Coffee donate button"></a></span>

Ngx Json Editor (wrapper for [json-editor](https://github.com/json-editor/json-editor)).
It takes a JSON Schema and uses it to generate an HTML form.

Tested under Angular 13.

## Installation

To install this library with npm, run below commands:

$ npm install --save-dev @types/json-editor

$ npm install --save @json-editor/json-editor @dimakorotkov/ngx-json-editor


Example:

```html
<div [formGroup]="formGroup">
  <dimakorotkov-ngx-json-editor [options]="options" formControlName="jsonControl">
  </dimakorotkov-ngx-json-editor>
</div>
```

## Usage

### Configuration

Include json-editor script in angular.json
```json
  "scripts": [
    ...,
    "@json-editor/json-editor/dist/jsoneditor.js"
  ],
```

Import module

```ts
import { NgxJsonEditorModule } from '@dimakorotkov/ngx-json-editor';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ....,
    ReactiveFormsModule,
    NgxJsonEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
Setup your component

```ts
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  template: `<div [formGroup]="formGroup">
    <dimakorotkov-ngx-json-editor [options]="options" formControlName="jsonControl">
    </dimakorotkov-ngx-json-editor>
  </div>`
})
export class AppComponent {

  formGroup = new FormGroup({
    'jsonControl': new FormControl()
  })

  //options from the json-editor demo
  options: JSONEditorOptions<any> = {
    schema: {
      type: "object",
      title: "Car",
      properties: {
        make: {
          type: "string",
          enum: [
            "Toyota",
            "BMW",
            "Honda",
            "Ford",
            "Chevy",
            "VW"
          ]
        },
        model: {
          type: "string"
        },
        year: {
          type: "integer",
          enum: [
            1995,1996,1997,1998,1999,
            2000,2001,2002,2003,2004,
            2005,2006,2007,2008,2009,
            2010,2011,2012,2013,2014
          ],
          default: 2008
        },
        safety: {
          type: "integer",
          format: "rating",
          maximum: "5",
          exclusiveMaximum: false,
          readonly: false
        }
      }
    }
  };

  constructor() {
    //uncomment to logging any json changes
    /*this.formGroup.valueChanges.subscribe(() => {
      console.log(this.formGroup.value.jsonControl);
    })*/
  }
}
```

### Editor options

You can use all the [configuration options](https://github.com/json-editor/json-editor#options) from the json-editor.

## License - MIT