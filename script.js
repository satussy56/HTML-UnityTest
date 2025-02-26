/**
 * ボタンから呼び出し：アプリを起動する
 * @param {string} appName - 起動したいアプリ名 (RoadWeb など)
 */
function startApp(appName) {
    // 既にUnityインスタンスがあれば終了してから再ロードする例
    // ただし、Quit() を実行すると古いインスタンスの解放待ち等があるので
    // 状況に応じて実装を調整してください
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
   * Unityアプリをロードして表示する
   * @param {string} appName - アプリフォルダ名
   */
  function loadApp(appName) {
    const unityContainer = document.getElementById('unityContainer');
    unityContainer.style.display = 'block';
  
    // ビルドファイル(JSON)のパスを組み立てる
    // (例： Build/RoadWeb/Build_WebGL.json )
    const buildPath = `Build/${appName}/Build_WebGL.json`;
  
    // UnityLoaderを使う場合 (2019以前 or テンプレートによる)
    window.unityInstance = UnityLoader.instantiate(
      'unityContainer', // コンテナID
      buildPath,        // JSONファイルへのパス
      {
        onProgress: (instance, progress) => {
          console.log(`Unity progress: ${progress * 100}%`);
        }
      }
    );
  
    // ※ Unity 2021+ などで CreateUnityInstance を使う場合は下記のように変更:
    /*
    createUnityInstance(unityContainer, {
      dataUrl: `Build/${appName}/RoadWeb.data.unityweb`,
      frameworkUrl: `Build/${appName}/RoadWeb.framework.js.unityweb`,
      codeUrl: `Build/${appName}/RoadWeb.wasm.unityweb`,
      streamingAssetsUrl: "StreamingAssets",
    }).then((instance) => {
      window.unityInstance = instance;
    }).catch((message) => {
      console.error(message);
    });
    */
  }