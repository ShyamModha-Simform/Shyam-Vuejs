import { Field as vField, Form as vForm, ErrorMessage, configure, defineRule } from "vee-validate"
import { required, integer } from "@vee-validate/rules"

export default {
    install(app){   // options are also accesible to setup default configuration
        app.component('vField', vField)
        .component('VForm', vForm)
        .component('ErrorMessage', ErrorMessage);

        defineRule('required', required);
        defineRule('integer', integer);

        configure({
            bails: false,
            generateMessage: (ctx) => {
                const messages = {
                    required: `This field is should not be empty`,
                    integer: `This field should contain only Integer`,
                }

                const message = messages[ctx.rule.name] ? messages[ctx.rule.name] : 'This field is not valid';

                return message;
            }
        });
    }
}