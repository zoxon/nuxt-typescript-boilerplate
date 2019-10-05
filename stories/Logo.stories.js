import { storiesOf } from '@storybook/vue'
import centered from '@storybook/addon-centered/vue'

import Logo from '@/components/Logo'

storiesOf('Components|Core/Logo', module)
  .addDecorator(centered)

  .add('default', () => ({
    components: { Logo },
    template: /* template */ `<Logo />`
  }))
