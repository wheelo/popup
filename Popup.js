/**
 * @file 移动端状态弹出框模块
 * @author Erik Peng<pengxiaolong@baidu.com>
 */

// need zepto or jquery support


const defaultOptions = {
    'type': 'state',      // 两种弹窗选择：加载框(loading..)与状态框(设置成功)
    'icon': true,         // 需不需要图标
    'text': '',           // 显示的文字
    'closeTimeout': '5000',   // 显示持续的时间(open时侯用，多长时间后关闭)
    'container': 'popupContainer', // 弹框最外层元素的class
    'fade-duration': 'fast' // fade in/out快慢速度: fast, normal, slow or integer in ms
};


class Popup {
    constructor(options) {
        // if compatible happens, ask `object-assign` for a pollifill
        this.options = Object.assign({}, defaultOptions, options);
        let type = this.options.type;
        if (type === 'loading') {
            this.options.text = this.options.text || '请稍候...';
        }

        this.stateMarkup = 'popup-' + type;
        this.iconMarkup = this.options.icon ? '<i class="popup-icon icon-' + type + '"></i>' : '';
    }

    openPopup(duration) {
        let options = this.options;
        // 页面同时刻只能出现一个loading弹出框
        if ($('.' + options['container']).length !== 0) {
            return;
        }
        let $container = $('<div class="' + options['container'] + '"/>');
        $('html').append($container);
        // Generate the HTML
        let $popup = $('<div class="popup ' + this.stateMarkup + '">' + this.iconMarkup
                        + '<div class="popup-text">' + this.options.text + '</div></div>');

        if (options.type === 'state') {
            this.close(options.closeTimeout, duration);
        }
        $container.append($popup).fadeIn(duration);
        return this;
    }

    closePopup(duration) {
        $('.' + this.options['container']).fadeOut(duration, function () {
            $(this).remove();
        });
    }
    // timeout: 多长时间后打开，duration: 打开速度
    // State('设置成功').open(1500, 'slow')
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

}


module.exports = Popup;