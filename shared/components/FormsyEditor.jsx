/**
 * 富文本编辑器封装，基于ckeditor
 * @author chenlinfei<chenlinfei@ezijing.com>
 * @since 2016-02-29
 */
import React from 'react';
import Formsy from 'formsy-react';
import { TextField } from 'material-ui';

let countor = 0;

let FormsyEditor = React.createClass({
    mixins: [ Formsy.Mixin ],

    propTypes: {
        name: React.PropTypes.string.isRequired,
        id: React.PropTypes.string
    },

    getDefaultProps() {
        countor++;
        return {
            id: 'editor_' + countor
        };
    },

    componentDidMount: function() {
        require('ckeditor');
        const editor = window.CKEDITOR.replace(this.props.id, {
            height: 150,
            uiColor: '#eeeeee',
            filebrowserImageUploadUrl: '/api/editor/upload',
            resize_enabled: typeof this.props.resizable === 'boolean' ? this.props.resizable : true,
            toolbar: [
                [ 'Bold', 'Italic', 'Strike', '-', 'RemoveFormat'],
                [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote' ],
                [ 'Link', 'Unlink' ],
                [ 'Image' ]
            ]
        });
        editor.on('change', (evt => {
            let v = evt.editor.getData();
            // 因ckeditor会对内部进行html实体编码，服务器端获取会根据&区分，导致读取不到，需要两次转码
            // 更正：因node接收时转换了一次，然后php接收时又会转换一次
            // 编码转换放到提交前处理
            //v = encodeURIComponent(encodeURIComponent(v));
            this.setValue(v);
        }).bind(this));
    },

    /**
     * 清空编辑器
     */
    setEditorData: function(v) {
        CKEDITOR.instances[this.props.id].setData(v);
    },

    render: function () {
        let obj = Object.assign({}, this.props);
        delete obj.name;
        obj.style = Object.assign({width: '100%'}, obj.style || {});
        obj.underlineShow = false;

        return (
            <div>
                <div><TextField {...obj}  /></div>
                <div style={{ color: '#f33446', fontSize: '12px', lineHeight: '12px', padding: '5px 0' }}>{ this.getErrorMessage() }</div>
            </div>
        );
    }
});

module.exports = FormsyEditor;
