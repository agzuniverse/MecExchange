/*
It has been concluded that to write effective tests that can lock down
component functionality, a significantly higher level of componentisation is
required in the code. If any future refactoring achieves code splitting to
the point where a large number of pure components exist, unit testing with
Jest+Enzyme can be taken up again.
*/

// import React from 'react';
// import { shallow, mount, render } from 'enzyme';
// import Home from '../Home'

// describe('Tests for Home', () => {
//  test('should render without throwing an error', () => {
//    shallow(<Home />);
//  });
// });
