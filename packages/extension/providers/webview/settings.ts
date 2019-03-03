import WebviewProvider from './webview-provider';
import ConnectionExplorer from '../connection-explorer';
import { getDbId } from '@sqltools/core/utils';

export default class SettingsWebview extends WebviewProvider {
  protected id: string = 'Settings';
  protected title: string = 'SQLTools Settings';

  constructor() {
    super();
    this.setMessageCallback(({ action, payload }) => {
      switch (action) {
        case 'createConnection':
          return this.createConnection(payload);
        default:
        break;
      }
    });
  }

  private createConnection = async ({ connInfo }) => {
    ConnectionExplorer.addConnection(connInfo)
    .then(() => {
      this.postMessage({ action: 'createConnectionSuccess', payload: { connInfo: { ...connInfo, id: getDbId(connInfo) } } });
    }, (payload) => {
        this.postMessage({ action: 'createConnectionError', payload });
    });
  }
}
