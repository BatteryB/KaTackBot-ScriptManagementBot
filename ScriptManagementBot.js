const prefix = '>';
let BatterySaving = false;

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
    if (sender == 'your katack name') { //본인 카톡이름 변경 필수 / You must change your Kakao Talk name

        if(msg == prefix + 'help'){
            replier.reply(help());
        }

        if(msg.startsWith(prefix + 'on ')){
            let scriptName = msg.substr(4);
            let isOn = Api.on(scriptName);
            
            replier.reply(scriptName + ' off : ' + isOn);
        }

        if (msg.startsWith(prefix + 'off ')) {
            let scriptName = msg.substr(5);
            let isOff = Api.off(scriptName);

            replier.reply(scriptName + ' off : ' + isOff );
        }

        if (msg == prefix + 'on') {
            replier.reply('All Bots On');
            Api.on();
        }

        if (msg == prefix + 'off') {
            replier.reply('All Bots Off');
            Api.off();
        }

        if(msg.startsWith(prefix + 'toast ')){
            let toastText = msg.substr(7);
            Api.showToast(toastText);
        }

        if(msg == prefix + 'compile'){
            Api.compile();
            replier.reply('all script compile completed');
        }

        if(msg.startsWith(prefix + 'compile ')){
            let compile = Api.compile(msg.substr(9));
            replier.reply(msg.substr(9) + ' compiled : ' + compile);
        }

        if(msg == prefix + 'Battery'){
            let BatteryLevel = Device.getBatteryLevel()
            replier.reply(BatteryLevel + "%");
        }

        if(msg == prefix + 'BatterySaving'){
            BatterySaving = !BatterySaving;
            replier.reply('BatterySaving : ' + BatterySaving);
            Api.showToast('남은 배터리 잔량이 15% 이하 이므로 모든 봇을 off 합니다.\n(관리자봇 포함)');
        }

        if(BatterySaving){
            if(Device.getBatteryLevel() <= 15){
                if(room == '오한새'){
                    replier.reply('남은 배터리 잔량이 15% 이하 이므로 모든 봇을 off 합니다.\n(관리자봇 포함)');
                    Api.showToast('남은 배터리 잔량이 15% 이하 이므로 모든 봇을 off 합니다.\n(관리자봇 포함)');
                    Api.off();
                }
            }
        }
    }
}

function help(){
    let msg = '관리자 명령어​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​\n\n';
    const help = [
        'on',
        'on (scriptName)',
        'off',
        'off (scriptName)',
        'compile',
        'compile (scriptName)',
        'toast (text)',
        'Battery',
        'BatterySaving',
        '',
        '접두사 : >'
    ];

    msg += help.join('\n');

    return msg;
}