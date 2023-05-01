import { Field as vField, Form as vForm, ErrorMessage, configure, defineRule } from 'vee-validate'
import { required, integer, min, max, alpha_spaces, url } from '@vee-validate/rules'

export default {
  install(app) {
    // options are also accesible to setup default configuration
    app
      .component('vField', vField)
      .component('VForm', vForm)
      .component('ErrorMessage', ErrorMessage)

    defineRule('required', required)
    defineRule('integer', integer)
    defineRule('min', min)
    defineRule('max', max)
    defineRule('alpha_spaces', alpha_spaces)
    defineRule('url', url)

    configure({
      bails: false,
      generateMessage: (ctx) => {
        const messages = {
          required: `This field is should not be empty`,
          integer: `This field should contain only Integer`,
          min: `This field should contain minimum ${ctx.rule.params} characters`,
          max: `This field should not contain more than ${ctx.rule.params} characters`,
          alpha_spaces: `This field should only contain alphabatic characters`,
          url: `This field must contain URL`
        }

        const message = messages[ctx.rule.name]
          ? messages[ctx.rule.name]
          : 'This field is not valid'

        return message
      }
    })
  }
}
