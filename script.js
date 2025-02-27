/**
 * ボタンから呼び出し：アプリを起動する
 * @param {string} appName - 起動したいアプリ名 (例: "RoadWeb")
 */
function startApp(appName) {
    // 既に Unity インスタンスが存在する場合は、Quit() してから再ロード
    if (window.unityInstance && window.unityInstance.Quit) {
      window.unityInstance
        .Quit()
        .then(() => loadApp(appName))
        .catch(() => loadApp(appName));
    } else {
      loadApp(appName);
    }
  }
  
  /**
   * Unity アプリをロードして表示する
   * @param {string} appName - アプリフォルダ名 (例: "RoadWeb")
   */
  function loadApp(appName) {
    const unityContainer = document.getElementById('unityContainer');
    unityContainer.style.display = 'block'; // コンテナを表示
  
// 新しいコード（createUnityInstance を使う場合）
    createUnityInstance(document.getElementById("unityContainer"), {
        dataUrl: `Build/${appName}/${appName}.data.unityweb`,
        frameworkUrl: `Build/${appName}/${appName}.framework.js.unityweb`,
        codeUrl: `Build/${appName}/${appName}.wasm.unityweb`,
        streamingAssetsUrl: "StreamingAssets",
        companyName: "MyCompany",
        productName: appName,
        productVersion: "1.0"
    }).then((instance) => {
        window.unityInstance = instance;
    }).catch((error) => {
        console.error(error);
    });

  }