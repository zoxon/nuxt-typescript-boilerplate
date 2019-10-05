import { mount } from '@vue/test-utils'
import Logo from '@/components/Logo.vue'

describe('Logo', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Logo)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('should match to snapshot', () => {
    const wrapper = mount(Logo)
    expect(wrapper).toMatchSnapshot()
  })
})
