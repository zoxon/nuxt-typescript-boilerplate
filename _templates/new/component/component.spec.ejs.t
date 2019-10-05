---
to: "components/<%= h.inflection.dasherize(name).toLowerCase().slice(0, 5) === 'base-' ? '_' : '' %><%= h.inflection.dasherize(name).toLowerCase() %>.spec.js"
---
<%
  const dashedName = h.inflection.dasherize(name).toLowerCase()
  const isHasBasePrefix = dashedName.slice(0, 5) === 'base-'
  const fileName = (isHasBasePrefix? '_' : '') + dashedName
  const importName = h.inflection.camelize(fileName.replace(/-/g, '_'))

%>import { shallowMount } from '@vue/test-utils'
import <%= importName %> from '@/components/<%= fileName %>'

describe('components/<%= fileName %>', () => {
  it('is a Vue instance', () => {
    const wrapper = shallowMount(<%= importName %>)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
