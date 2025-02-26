/**
 * ボタンから呼び出し：アプリを起動する
 * @param {string} appName - 起動したいアプリ名 (例: "RoadWeb")
 */
function startApp(appName) {
    // 既にUnityインスタンスが存在する場合は、Quit()してから再ロード
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
   * @param {string} appName - アプリフォルダ名 (例: "RoadWeb")
   */
  function loadApp(appName) {
    const unityContainer = document.getElementById('unityContainer');
    unityContainer.style.display = 'block'; // コンテナを表示
  
    // ビルドファイル(JSON)のパスを組み立てる
    // 例: Build/RoadWeb/Build_WebGL.json
    const buildPath = `Build/${appName}/Build_WebGL.json`;
  
    // UnityLoader.instantiate() を使用してロード（Unity 2019以前向け）
    window.unityInstance = UnityLoader.instantiate(
      'unityContainer', // コンテナID
      buildPath,        // JSONファイルへのパス
      {
        onProgress: (instance, progress) => {
          console.log(`Unity progress: ${progress * 100}%`);
        }
      }
    );
  }