/**
 * @file: Proof-of-concept of a popup using ES2015
 * @author Erik Peng<wheelo@163.com>
 */

// need zepto or jquery support
// const objectAssign = require('object-assign');


const defaultOptions = {
    'type': 'state',      // 两种弹窗选择：加载框(loading..)与状态框(设置成功)
    'icon': true,         // 需不需要图标
    'text': '',           // 显示的文字
    'closeTimeout': '5000',   // 显示持续的时间(open时侯用，多长时间后关闭)
    'container': 'popupContainer', // 弹框最外层元素的class
    'fade-duration': 'fast', // fade in/out快慢速度: fast, normal, slow or integer in ms
    'confirmText': 'JumpText',
    'callback': () => {}
};


class Popup {
    constructor(options) {
        // if compatible happens, use object-assign for a pollifill
        this.options = Object.assign({}, defaultOptions, options);
        let type = this.options.type;
        if (!this.options.container) {
            if (type === 'state' || type === 'loading') {
                this.options.container = 'popupContainer';
            }
            if (type === 'confirm') {
                this.options.container = 'popupConfirmContainer';
            }
            if (type === 'verify') {
                this.options.container = 'popupVeirfyContainer';
            }
        }
        this.$popup = '';
        this.stateMarkup = 'popup-' + type;
        this.iconMarkup = this.options.icon ? '<i class="popup-icon icon-' + type + '"></i>' : '';
    }

    // timeout: 多长时间后打开，duration: 打开速度
    open(timeout = 0, duration) {
        let options = this.options;
        duration = duration || options['fade-duration'];
        if (timeout > 0) {
            setTimeout(this.openPopup.bind(this, duration), timeout);
        } else {
            this.openPopup(duration);
        }
        return this;
    }
    // timeout: 多长时间后自动关闭，duration: 关闭速度
    close(timeout = 0, duration) {
        duration = duration || this.options['fade-duration'];
        if (timeout > 0) {
            setTimeout(this.closePopup.bind(this, duration), timeout);
        } else {
            this.closePopup(duration);
        }
        return this;
    }

    openPopup(duration) {
        let options = this.options;
        // 页面同时刻只能出现一个loading弹出框
        if ($('.' + options['container']).length !== 0) {
            return;
        }
        let $container = $('<div class="' + options['container'] + '"/>');
        $('html').append($container);
        // 渲染$popup
        this.renderElement();

        $container.append(this.$popup).fadeIn(duration);
        // 初始化事件
        this.initEvent(duration);

        return this;
    }

    closePopup(duration) {
        $('.' + this.options['container']).fadeOut(duration, function () {
            $(this).remove();
        });
    }
    
    // Generate the HTML
    renderElement() {
        let options = this.options;
        if (options.type === 'confirm') {
            let textWrapper = `<div class="popup-text-dec">${options.text}</div>`
            let controlField = `<li class="popup-cancel-cancel">取消</li><li class="popup-cancel-jump">${options.confirmText}</li>`;
            this.$popup = $('<div class="popup ' + this.stateMarkup + '">' + textWrapper
                        + '<ul class="popup-control-field">' + controlField + '</ul></div>');
        }
        if (options.type === 'state' || options.type === 'loading') {
            this.$popup = $('<div class="popup ' + this.stateMarkup + '">' + this.iconMarkup
                        + '<div class="popup-text">' + this.options.text + '</div></div>');
        }
        if (options.type === 'verify') {
            let textWrapper = `<div class="popup-text-dec">${options.text}</div>`
            this.$popup = $('<div class="popup ' + this.stateMarkup + '">' + textWrapper
                        + '<div class="popup-control-field">确定</div></div>');
        }
    }

    initEvent(duration) {
        let options = this.options;
        if (options.type === 'confirm') {
            $('.popup-cancel-cancel').on('click', e => {
                this.close(0, 'fast');
                return false;
            });
            $('.popup-cancel-jump').on('click', e => {
                options.callback();
                return false;
            });
        }
        if (options.type === 'verify') {
            $('.popup-control-field').on('click', e => {
                options.callback();
                return false;
            });
        }
        if (options.type === 'state') {
            this.close(options.closeTimeout, duration);
        }
    }

}


module.exports = Popup;
