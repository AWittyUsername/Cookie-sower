CS = {}
if(Game.isMinigameReady(Game.Objects['Farm'])) {
    CS.init = function () {
        CS.Garden = Game.Objects['Farm'].minigame;
        CS.initializeTool();
        if (Game.prefs.popups) {
            Game.Popup("Cookie sower loaded!");
        }
        else {
            Game.Notify("Cookie sower loaded!", "Cookie sower for Cookie Clicker version " + Game.version, '', 1, 1);
        }
    }
    CS.plantAll = function () {
        if (CS.Garden.seedSelected >= 0) {
            var plantId = CS.Garden.seedSelected;
            for (var x = 0; x < 6; x++) {
                for (var y = 0; y < 6; y++) {
                    if (CS.Garden.isTileUnlocked(x, y) && CS.Garden.canPlant(CS.Garden.plantsById[plantId]) && (CS.Garden.plot[y][x][0] == 0)) {
                        CS.Garden.plot[y][x] = [plantId + 1, 0];
                        Game.Spend(CS.Garden.getCost(CS.Garden.plantsById[plantId]));
                    }
                }
            }
            l('gardenSeed-' + CS.Garden.seedSelected).classList.remove('on');
            CS.Garden.seedSelected = -1;
            CS.Garden.toRebuild = true;
        }
    }
    CS.initializeTool = function () {
        CS.Garden.tools['sower'] = {
            name: 'Quick sower',
            icon: 2,
            desc: '-',
            descFunc: function () {
                return 'Instantly fill as many empty garden tiles as you can afford with the selected seed. <span class="red">Be careful when <using></using> this tool! Some seeds are VERY expensive.</span><div class=\"line\"></div>';
            },
            func: function () {
                CS.plantAll();
            }
        }
        CS.Garden.toolsById = [];
        var n = 0;
        for (var i in CS.Garden.tools) {
            CS.Garden.tools[i].id = n;
            CS.Garden.tools[i].key = i;
            CS.Garden.toolsById[n] = CS.Garden.tools[i];
            n++;
        }
        CS.Garden.buildPanel();
    }
}
else{
    CS.init = function(){
        if (Game.prefs.popups) {
            Game.Popup("You have not yet unlocked the garden minigame. Please reload the plugin when you do.");
        }
        else {
            Game.Notify("Cookie sower loaded!", "You have not yet unlocked the garden minigame, though. Please reload the plugin when you do.", '', 0, 1);
        }
    }
}
CS.init();