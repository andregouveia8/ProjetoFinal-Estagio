
import { App } from 'botframework-webchat';
import { DirectLine } from 'botframework-directlinejs';
require('../../../node_modules/BotFramework-WebChat/botchat.css');

import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';
import styles from './Bot.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';
import * as $ from 'jquery';
import { Text } from "@microsoft/sp-core-library";
import { SPHttpClient } from "@microsoft/sp-http";

import * as strings from 'BotGaryApplicationCustomizerStrings';
import { takeUntil } from 'rxjs/operator/takeUntil';


const LOG_SOURCE: string = 'BotBtExtensionCustomizer';
var flag = true;

export interface IBotBtExtensionCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
  Top: string;
  Bottom: string;

}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class BotBtExtensionCustomizer
  extends BaseApplicationCustomizer<IBotBtExtensionCustomizerProperties> {

  // These have been added
  private _topPlaceholder: PlaceholderContent | undefined;
  private _bottomPlaceholder: PlaceholderContent | undefined;



  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    let message: string = this.properties.testMessage;
    if (!message) {
      message = '(No properties were provided.)';
    }

    // Added to handle possible changes on the existence of placeholders.
    this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHolders);

    // Call render method for generating the HTML elements.
    this._renderPlaceHolders();


    var chat1 = document.querySelector('#chat1');
    var chat2 = document.querySelector('#chat2');

    chat1.addEventListener('click', function (e) {
      $("#overlay").fadeIn(100);
      $("#chat1").fadeOut(100);
      $("#chat2").fadeIn(100);
      
      // $("#overlay").show();
     // $("#chat1").hide();
      //$("#chat2").show();

    });

    chat2.addEventListener('click', function (e) {
      $("#overlay").fadeOut(100);
      
      $("#chat2").fadeOut(100);
      $("#chat1").fadeIn(100);
      
      //$("#overlay").hide();
      //$("#chat2").hide();
      //$("#chat1").show();
    });





    return Promise.resolve<void>();
  }

  private _renderPlaceHolders(): void {

    console.log('BotBtExtensionCustomizer._renderPlaceHolders()');
    console.log('Available placeholders: ',
      this.context.placeholderProvider.placeholderNames.map(name => PlaceholderName[name]).join(', '));



    // Handling the bottom placeholder
    if (!this._bottomPlaceholder) {
      this._bottomPlaceholder =
        this.context.placeholderProvider.tryCreateContent(
          PlaceholderName.Bottom,
          { onDispose: this._onDispose });

      // The extension should not assume that the expected placeholder is available.
      if (!this._bottomPlaceholder) {
        console.error('The expected placeholder (Bottom) was not found.');
        return;
      }

      if (this.properties) {
        let bottomString: string = this.properties.Bottom;
        if (!bottomString) {
          bottomString = '(Bottom property was not defined.)';
        }

        if (this._bottomPlaceholder.domElement) {
          this._bottomPlaceholder.domElement.innerHTML = `
        <div class="${styles.app}">
        <button id="chat2" class="ms-bgColor-themeDark ms-fontColor-white ${styles.bottom}"> X </button>
        <button id="chat1" class="ms-bgColor-themeDark ms-fontColor-white ${styles.bottom}"> Bot Gary </button>
            <div id="overlay" class="${styles.overlay}">
            <div id="${this.context.instanceId}"></div>
          </div>             
      </div>`;

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
          } else {
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
      }
    }
  }
  private _onDispose(): void {
    console.log('[BotBtExtensionCustomizer._onDispose] Disposed custom top and bottom placeholders.');
  }

}