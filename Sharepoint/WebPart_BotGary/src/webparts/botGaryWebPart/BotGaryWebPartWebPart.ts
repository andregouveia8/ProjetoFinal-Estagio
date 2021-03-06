import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';


import { App } from 'botframework-webchat';
import { DirectLine } from 'botframework-directlinejs';
require('../../../node_modules/BotFramework-WebChat/botchat.css');

import * as strings from 'BotGaryWebPartWebPartStrings';
import { IBotGaryWebPartProps } from './IBotGaryWebPartProps';


export default class BotWebBtWebPart extends BaseClientSideWebPart<IBotGaryWebPartProps> {


  // box-shadow: 0 4px 8px 0 rgba(0,0,0,.2), 0 6px 20px 0 rgba(0,0,0,.19);

  public render(): void {
    this.domElement.innerHTML = `<div style="height:400px;" id="${this.context.instanceId}"></div>`;

    // Get userprofile from SharePoint REST endpoint
    var req = new XMLHttpRequest();
    req.open("GET", "/_api/SP.UserProfiles.PeopleManager/GetMyProperties", false);
    req.setRequestHeader("Accept", "application/json");
    req.send();
    var user = { id: "userid", name: "unknown" };
    if (req.status == 200) {
      var result = JSON.parse(req.responseText);
      user.id = result.Email;
      user.name = result.DisplayName;
    }else{
      console.log(req);

    }

    // Initialize DirectLine connection
    var botConnection = new DirectLine({
      secret: "Hi2f-zAB6MU.cwA.WWs.p-R6-gp0eBljnKZ6OfbrmHuafVz2eW2MDmZNHh4uf00"
    });

    // Initialize the BotChat.App with basic config data and the wrapper element
    App({
      user: user,
      botConnection: botConnection
    }, document.getElementById(this.context.instanceId));

    // Call the bot backchannel to give it user information
    botConnection
      .postActivity({ type: "event", name: "sendUserInfo", value: user.name, from: user })
      .subscribe(id => console.log("success"));   
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}