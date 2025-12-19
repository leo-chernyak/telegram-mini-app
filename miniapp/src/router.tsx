import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Welcome } from './screens/Welcome';
import { Pay } from './screens/Pay';
import { Success } from './screens/Success';
import { Status } from './screens/Status';
import { Invite } from './screens/Invite';
import { Docs } from './screens/Docs';

export function AppRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/pay" element={<Pay />} />
        <Route path="/success" element={<Success />} />
        <Route path="/status" element={<Status />} />
        <Route path="/invite" element={<Invite />} />
        <Route path="/docs" element={<Docs />} />
      </Routes>
    </HashRouter>
  );
}


