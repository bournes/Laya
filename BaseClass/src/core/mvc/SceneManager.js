/*
* name;
*/
var SceneManager = (function () {

    /**回退类型*/
    SceneManager.NO_BACK = 0;
    SceneManager.BACK = 1;

    function SceneManager() {
        SceneManager.__super.call(this);
        this._scenes = {};
        this._currScene = null;
    }

    Laya.class(SceneManager, "SceneManager", BaseClass);
    var _proto_ = SceneManager.prototype;

    /**
     * 清空处理
     * @param key Scene唯一标识 {any}
     */
    _proto_.clear = function(key) {
        var scene = this._scenes[key];
        if(scene){
            if(scene == this._currScene){
                scene.onExit();
                this._currScene = null;
            }
            delete this._scenes[key];
        }
    }

    /**
     * 清理所有
     */
    _proto_.clearAll = function() {
        if(this._currScene){
            this._currScene.onExit();
            this._currScene = null;
        }
        this._scenes = {};
    }

    /**
     * 注册Scene
     * @param key Scene唯一标识 {any}
     * @param scene Scene对象 {BaseScene}
     */
    _proto_.register = function(key, scene) {
        this._scenes[key] = scene;
    }

    /**
     * 注销Scene
     * @param key Scene唯一标识 {any}
     */
    _proto_.unregister = function(key) {
        if(this._scenes && this._scenes[key]){
            delete this._scenes[key];
        }
    }

    /**
     * 切换场景
     * @param key 场景唯一标识 {any}
     */
    _proto_.runScene = function(key) {
        var nowScene = this._scenes[key];
        if (!nowScene) {
            Logger.trace("场景" + key + "不存在");
            return;
        }

        if (this._currScene) {
            this._currScene.onExit();
        }

        nowScene.onEnter();
        this._currScene = nowScene;
    }

    /**
     * 获取当前Scene
     * @returns {any}
     */
    _proto_.getCurrScene = function() {
        return this._currScene;
    }

    /**
     * 获取scene
     * @param 场景唯一标识
     */
    _proto_.getScene = function(key){
        var scene = this._scenes[key];
        if(scene){
            return scene;
        }
        Logger.log(key + "场景不存在！");
        return null;
    }

    return SceneManager;
}());
