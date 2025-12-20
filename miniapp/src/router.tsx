import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Welcome } from './screens/Welcome';
import { Pay } from './screens/Pay';
import { Success } from './screens/Success';
import { Status } from './screens/Status';
import { Invite } from './screens/Invite';
import { Docs } from './screens/Docs';
import { Landing } from './screens/Landing';
import { Product } from './screens/Product';
import { Support } from './screens/Support';
import { Account } from './screens/Account';
import { DocTerms } from './screens/docs/DocTerms';
import { DocPrivacy } from './screens/docs/DocPrivacy';

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/pay" element={<Pay />} />
      <Route path="/success" element={<Success />} />
      <Route path="/status" element={<Status />} />
      <Route path="/invite" element={<Invite />} />
      <Route path="/docs" element={<Docs />} />
      <Route path="/docs/terms" element={<DocTerms />} />
      <Route path="/docs/privacy" element={<DocPrivacy />} />
      <Route path="/product" element={<Product />} />
      <Route path="/support" element={<Support />} />
      <Route path="/account" element={<Account />} />
    </Routes>
  );
}


