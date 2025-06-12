import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";



// components

import ClientNavbar from "components/Navbars/clientNavbar";
import Clientfooter from "components/Footers/FooterClient"

// views
import clientpage from "views/clients/clientpage";
import Clientrequest from "views/clients/clientrequest";
import quotes from "views/clients/quotes";
import Shipments from "views/clients/Shipments";
import Documents from "views/clients/Documents";
import ProfileClient from "views/clients/profileClient";


export default function Client() {
  return (
    <>
      <ClientNavbar />
      <div className="relative  bg-blueGray-100 mt-20 w-full">
        
        <div
        
        className="mx-auto w-full -m-24">
          <Switch>
            

            <Route path="/client/clientpage" exact component={clientpage} />
            <Route path="/client/clientrequest" exact component={Clientrequest} />
            <Route path="/client/quotes" exact component={quotes} />
            <Route path="/client/shipments" exact component={Shipments} />
            <Route path="/client/documents" exact component={Documents} />
            <Route path="/client/profileClient" exact component={ProfileClient} />
            <Redirect from="/client" to="/client/clientpage" />
           
          </Switch>
          <div
          className=" mt-20 w-full">
          <Clientfooter >

          </Clientfooter>
          </div>
        </div>
        
      </div>
      
      
    </>
  );
  
}
