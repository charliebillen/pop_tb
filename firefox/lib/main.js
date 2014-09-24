require('sdk/ui/button/action').ActionButton({
  id: 'pop-tb',
  label: 'Populate TB',
  icon: './icon-16.png',
  onClick: handleClick
});

function handleClick(state) {
  require('sdk/tabs').activeTab.attach({
    contentScriptFile: require('sdk/self').data.url('pop.js')
  });
}
