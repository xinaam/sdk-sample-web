# Mzaalo Web SDK
This repository contains the documentation for the integration of the Web SDKs of the Mzaalo platform.

## Table of contents

 - [Overview](#overview)
 - [Installation](#installation)
	 - [Requirements](#requirements)
	 - [Configuration](#configuration)
- [Getting Started](#getting-started)
- [Features and Implementation](#features-and-implementation)
- [Sequence Flow](#sequence-flow)

## Overview
Mzaalo SDKs have two modules:

 1. **MzaaloAuth** : This module contains authentication features like login, logout, etc.
 2. **MzaaloRewards** : This module contains all the authentication features, plus features of rewards like adding rewards, fetching balance, etc.

Both these modules are shippable under one javascript library. You can call `init` function with any of the module. 
    
## Installation

### Requirements

 - Supported Browsers : Chrome, Firefox, Safari and IE8+ 

### Configuration
Add `mzaalo-sdk` to the script tag in your code:

	<script src = 'https://sdk.mzaalo.com/dist/mzaalo-sdk.min.js' ></script>
  
If you're using `npm-modules` then install `mzaalo-web-sdks` from npmjs and then add in your code:

	import { MzaaloAuth, MzaaloRewards } from 'mzaalo-web-sdks'

## Getting Started
    
The entry point to the SDK is through the `init` function that gets called with a valid partner code and environment type(STAGING or PRODUCTION).

    MzaaloRewards.init("YOUR_PARTNER_CODE", MzaaloEnvironment)
    .then(response => {
    	// You will get message as 'Initialization Successful'
    })
    .catch(error => {
    	error : error
    })

Here `MzaaloEnvironment` can be the following options:

 - **STAGING**
 - **PRODUCTION**


## Features and Implementation
### Login
Your application should call the `MzaaloAuth.login()` function as soon as the user is identified at your end.

    var userMeta = {
    	[userProperty] : value
    }
    
    MzaaloAuth.login("UNIQUE_ID_OF_YOUR_USER", userMeta)
    .then(response => {
    	// you will get response as user object
		user : response
    })
    .catch(error => {
    	error : error
    })

Here are the valid `userProperty` fields that can put as keys in the `userMeta` json:
|userProperty|Description|Data type|Example|
|--|--|--|--|
|email|Email Address of the user|String|johndoe@example.com|
|phone|Phone number of the user|String|9876543210|
|country_code|Country code of the user's phone number|String|+91, +44|

### isLoggedIn
You can call `MzaaloAuth.isLoggedIn()` function to check whether user is logged in or not.

	MzaaloAuth.isLoggedIn()
	.then(response => {
		// You will get object { success : true, message : 'Logged In', data : user }
	})
	.catch(error => {
		// You will get error object
	})

### Logout
Your application should call `MzaaloAuth.logout()` function when the user logs out from your application or when the user identitiy is no longer available to you.

    MzaaloAuth.logout()
    .then(response => {
    	// You will get message as 'Logout successfully'
    })
    .catch(error => {
    	error : error
    })


### Register Rewards Action
This is a feature that allows the application to register an action to the Mzaalo SDK, that should credit some rewards to the user.

    var eventMeta = {
    	[eventProperty] : value
    }
    
    MzaaloRewards.registerRewardAction(MzaaloRewardsActionTypes, eventMeta)
    .then(response => {
    	// you will get success response
    })
    .catch(error => {
    	error : error
    })

`MzaaloRewardsActionTypes` is a string that describes the type of action that the user has performed. The string has following options:
| Value | Description |
|--|--|
| `CONTENT_VIEWED` | Send this if you want to give rewards to the user for watching content |
| `CHECKED_IN` | Send this if you want to give rewards to the user for **launching the app** or **visiting some section of the app** on a daily basis |
| `SIGNED_UP` | Send this if you want to give reward to the user for signing up on your application. In this case, call this once the above mentioned login function has been successfully executed. |
| `REFERRAL_APPLIED` | When a user applies a referral code on the platform which he/she received from some other user previously. This will credit the rewards to the user who referred the current user. |

Here are the valid `eventProperty` fields that can be put as keys in the `eventMeta` json:
| eventProperty | MzaaloRewardsActionTypes | Description | Data type | Example |
|--|--|--|--|--|
| total_watch_time | `CONTENT_VIEWED` | The duration(in seconds) for which the user has watched the content | Integer | 600, (if the user watched a movie for ten minutes) |
| referee_user_id | `REFERRAL_APPLIED` | Unique user ID of the user at your system who referred the current user | String | abcdefgh |
| referee_user_meta | `REFERRAL_APPLIED` | This is the user meta of the person who referred this user. It's format is same as mentioned in the login function for `userMeta` parameter | Json Object | {"email":"johndoe@example.com"} |

### Fetch Reward Balance
Call this function if you want to fetch the balance of the user that is currently logged in.

    MzaaloRewards.getBalance()
    .then(response => {
    	// You will get response as balance of the user
    	balance : response
    })
    .catch(error => {
    	error : error
    })

## Sequence Flow
### mzaalo-auth

![Sequence flow diagram for mzaalo auth login and logout](https://xfinitesite.blob.core.windows.net/flow-diagrams/web-auth.png)

### mzaalo-rewards

![Sequence flow diagram from mzaalo rewards register action types](https://xfinitesite.blob.core.windows.net/flow-diagrams/web-rewards-rra.png)

![Sequence flow diagram from mzaalo fetch balance](https://xfinitesite.blob.core.windows.net/flow-diagrams/web-rewards-gb.png)

