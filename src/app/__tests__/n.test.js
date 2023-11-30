import {render, screen} from '@testing-library/react'
import {authOptions} from '@/lib/auth'
import {withMockAuth} from '@tomfreudenberg/next-auth-mock/jest'

//jest.mock("next-auth/client");
//import client, { Session } from "next-auth/client";
import '@testing-library/jest-dom'

/*
jest.mock("next-auth/react", () => {
    const originalModule = jest.requireActual('next-auth/react');
    const mockSession = {
      expires: new Date(Date.now() + 2 * 86400).toISOString(),
      user: { name: "admin" }
    };
    return {
      __esModule: true,
      ...originalModule,
      useSession: jest.fn(() => {
        return {data: mockSession, status: 'authenticated'}  // return type is [] in v3 but changed to {} in v4
      }),
    };
  });
*/

describe('Omega2', () => {
  it('Works2', async () => {})
})
