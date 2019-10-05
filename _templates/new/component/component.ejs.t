---
to: "components/<%= h.inflection.dasherize(name).toLowerCase().slice(0, 5) === 'base-' ? '_' : '' %><%= h.inflection.dasherize(name).toLowerCase() %>.vue"
---
<%
  const dashedName = h.inflection.dasherize(name).toLowerCase()
  const isHasBasePrefix = dashedName.slice(0, 5) === 'base-'
  const fileName = (isHasBasePrefix? '_' : '') + dashedName
  const componentName = isHasBasePrefix ? dashedName.slice(5) : dashedName
  const importName = h.inflection.camelize(fileName.replace(/-/g, '_'))

if (blocks.indexOf('template') !== -1) {
%><template>
  <div class="<%= componentName %>">
    <%= importName %> component
  </div>
</template>
<%
}

if (blocks.indexOf('script') !== -1) {
%>
<script>
export default {
  name: '<%= importName %>'<% if (blocks.indexOf('template') === -1) {
  %>,
  render(h) {
    return <div/>
  }<% } %>
}
</script>
<%
}

if (blocks.indexOf('style') !== -1) {
%>
<style lang="scss">
.<%= componentName %> {
  $root: &;
}
</style><%
}
%>
