/**
 * ボタンから呼び出し：アプリを起動する
 * @param {string} appName - 起動したいアプリ名（例: "RoadWeb"）
 */
function startApp(appName) {
    // 既に Unity インスタンスが存在すれば、Quit() してから再ロードする
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
   * @param {string} appName - アプリフォルダ名（例: "RoadWeb"）
   */
  function loadApp(appName) {
    const unityContainer = document.getElementById('unityContainer');
    unityContainer.style.display = 'block'; // 表示領域を表示
  
    // createUnityInstance() を使って Unity アプリをロード
    createUnityInstance(unityContainer, {
      dataUrl: `Build/${appName}/${appName}.data.unityweb`,
      frameworkUrl: `Build/${appName}/${appName}.framework.js.unityweb`,
      codeUrl: `Build/${appName}/${appName}.wasm.unityweb`,
      streamingAssetsUrl: "StreamingAssets",
      companyName: "MyCompany",
      productName: appName,
      productVersion: "1.0"
    })
      .then((instance) => {
        window.unityInstance = instance;
        console.log(`${appName} の起動に成功`, instance);
      })
      .catch((error) => {
        console.error(`${appName} の起動に失敗:`, error);
      });
  }