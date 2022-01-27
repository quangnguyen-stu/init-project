<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use BlackBits\LaravelCognitoAuth\Auth\AuthenticatesUsers;
use BlackBits\LaravelCognitoAuth\Auth\RegistersUsers;
use BlackBits\LaravelCognitoAuth\Auth\ResetsPasswords;
use BlackBits\LaravelCognitoAuth\Auth\SendsPasswordResetEmails;
use Laravel\Socialite\Facades\Socialite;


class AuthController extends Controller
{
    use AuthenticatesUsers;


    /**
     * Redirect the user to the provider authentication page.
     *
     * @return \Illuminate\Http\Response
     */
    public function redirectToProvider($driver)
    {
        return Socialite::driver($driver)->redirect();
    }

    /**
     * @return \Illuminate\Http\Response
     */
    public function handleProviderCallback($driver)
    {
        try {
            $user = Socialite::driver($driver)->user();
        } catch (\Exception $e) {
            return redirect()->route('login');
        }

        $existingUser = User::where('email', $user->getEmail())->first();

        if ($existingUser) {
            auth()->login($existingUser, true);
        } else {
            $newUser                    = new User;
            $newUser->provider_name     = $driver;
            $newUser->provider_id       = $user->getId();
            $newUser->name              = $user->getName();
            $newUser->email             = $user->getEmail();
            $newUser->email_verified_at = now();
            $newUser->avatar            = $user->getAvatar();
            $newUser->save();

            auth()->login($newUser, true);
        }

        return redirect($this->redirectPath());
    }


    public function login(Request $request)
    {
        $request['code']!==null?dd($request):'';
        return Inertia::render('Login', [
            'headerTitle' => 'LOGIN',
            'title' => 'LOGIN',
        ]);
    }

    public function authenticate(Request $request)
    {
            $respond=$this->attemptLogin($request);
            if ($respond===true) {
                $request->session()->regenerate();

                return redirect('/home')->with('success', true);
            }
                return back()->with('success', false);
    }

    public function userLogOut(Request $request)
    {
       return $this->logout($request);
    }

    public function handleGoogleLogin(Request $request){
        dd($request);
    }
}
