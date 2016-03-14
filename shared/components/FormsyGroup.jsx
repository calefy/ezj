/**
 * 创建控制组，内部元素在变更时，执行 FormsyGroup.setValue()
 * 使用场景如：checkbox
 */
import React from 'react';
import Formsy from 'formsy-react';

let FormsyGroup = React.createClass({
  mixins: [ Formsy.Mixin ],

  propTypes: {
    name: React.PropTypes.string.isRequired
  },

  render: function () {
    return (
      <div
        {...this.props}
      >
        {this.props.children}
      </div>
    );
  }
});

module.exports = FormsyGroup;
