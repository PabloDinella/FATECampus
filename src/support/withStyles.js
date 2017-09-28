import withStyles from 'material-ui/styles/withStyles'

export default (displayName, styles, WrappedComponent) => {
  WrappedComponent.displayName = displayName
  return withStyles(styles, {name: displayName})(WrappedComponent)
}
