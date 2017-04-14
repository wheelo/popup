# popup
Proof-of-concept of a popup using ES2015

## Description
There are four modes in this popup plugin: Loading, State(success/fail), Verify(one verify button), Confirm(verify and cancel).

Mainly for Proof-of-concept, If you wanna use it, please use it with babel & less compliler

## Usage
```
    // 1. loading
    var loadToastr = Popup.Loading();
    loadToastr.open();
    loadToastr.close();

    // 2.State
    var stateToastr = Popup.State('注册成功');
    stateToastr.open(1500, 'slow');

    // 3. Verify
    var veirfyToastr = Popup.Verify(
        dec： '请输入描述文字1',
        callback() {
            console.log('点击确定后的回调函数')
            // veirfyToastr.close();
        }
    );
    veirfyToastr.open();

    // 4. Confirm
    var confirmToastr = Popup.Confirm(
        dec： '请输入描述文字2',
        callback() {
            console.log('点击确定后的回调函数')
        }
    );
    confirmToastr.open();
```