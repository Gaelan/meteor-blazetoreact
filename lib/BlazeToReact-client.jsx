const Passthrough = React.createClass({
    render() {
        return this.props.elements;
    }
})

BlazeToReact = function(name) {
  return React.createClass({
    shouldComponentUpdate() {
      // Blaze has the full control once started
      return false;
    },

    componentDidMount() {
      let el = React.findDOMNode(this);
      this.blazeView = Blaze.renderWithData(Template['BlazeToReactHelper'], {
          template: name,
          data: _.omit(this.props, 'children'),
          component: Passthrough,
          elements: this.props.children
      }, el);
    },

    componentWillUnmount() {
      Blaze.remove(this.blazeView);
    },

    componentWillReceiveProps(props) {
      _.extend(this.blazeView.dataVar.curValue, props);
      this.blazeView.dataVar.dep.changed();
    },

    render() {
      return <span />;
    }
  });
};
