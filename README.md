# Mzaalo Web SDK
This repository contains the documentation for the integration of the Web SDKs of the Mzaalo platform.

## Table of contents

 - [Overview](#overview)
 - [Installation](#installation)
	 - [Requirements](#requirements)
	 - [Configuration](#configuration)
- [Getting Started](#getting-started)
- [Features and Implementation](#features-and-implementation)
-[Sequence Flow](#sequence-flow)

## Overview
Mzaalo SDKs have two modules:

 1. **mzaalo-auth** : This module contains authentication features like login, logout, etc.
 2. **mzaalo-rewards** : This module contains all the authentication features, plus features of rewards like adding rewards, fetching balance, etc.

Both these modules are shippable as separate javascript libraries.
Structurally, `mzaalo-auth` is the subset of `mzaalo-rewards`. This means, any application that includes the library for `mzaalo-rewards` automatically gets the functionality for `mzaalo-auth` out of the box.

    
## Installation

### Requirements

 - Supported Browsers : Chrome, Firefox, Safari and IE8+ 

### Configuration
Add `mzaalo-sdk` to the script tag in your code:

   <script async defer src='https://mzaalo.azure-api.net/sdks/mzaalo-sdk.js'></script>

## Getting Started
    
The entry point to the SDK is through the `init` function that gets called with a valid partner code and environment type(STAGING or PRODUCTION).

    MzaaloRewards.init("YOUR_PARTNER_CODE", MzaaloEnvironment)

Here `MzaaloEnvironment` is an enum class with the following options:

 - **MzaaloEnvironment.STAGING**
 - **MzaaloEnvironment.PRODUCTION**


## Features and Implementation
### Login
Your application should call the `MzaaloAuth.login()` function as soon as the user is identified at your end.

    var userMeta = {
    	userProperty : value
    }
    MzaaloAuth.login("UNIQUE_ID_OF_YOUR_USER", userMeta)

Here are the valid `userProperty` fields that can put as keys in the `userMeta` json:
|userProperty|Description|Data type|Example|
|--|--|--|--|
|email|Email Address of the user|String|johndoe@example.com|
|phone|Phone number of the user|String|9876543210|
|country_code|Country code of the user's phone number|String|+91, +44|


### Logout
Your application should call `MzaaloAuth.logout()` function when the user logs out from your application or when the user identitiy is no longer available to you.

    MzaaloAuth.logout()


### Register Rewards Action
This is a feature that allows the application to register an action to the Mzaalo SDK, that should credit some rewards to the user.

    var eventMeta = {
    	eventProperty : value
    }
    MzaaloRewards.registerRewardAction(MzaaloRewardsActionTypes.XXXX, eventMeta)

`MzaaloRewardsActionTypes` is an enum class that describes the type of action that the user has performed. The enum has following options:
| Enum Value | Description |
|--|--|
| `MzaaloRewardsActionTypes.CONTENT_VIEWED` | Send this if you want to give rewards to the user for watching content |
| `MzaaloRewardsActionTypes.CHECKED_IN` | Send this if you want to give rewards to the user for **launching the app** or **visiting some section of the app** on a daily basis |
| `MzaaloRewardsActionTypes.SIGNED_UP` | Send this if you want to give reward to the user for signing up on your application. In this case, call this once the above mentioned login function has been successfully executed. |


Here are the valid `eventProperty` fields that can be put as keys in the `eventMeta` json:
| eventProperty | MzaaloRewardsActionTypes | Description | Data type | Example |
|--|--|--|--|--|
| total_watch_time | `CONTENT_VIEWED` | The duration(in seconds) for which the user has watched the content | Integer | 600, (if the user watched a movie for ten minutes) |


### Fetch Reward Balance
Call this function if you want to fetch the balance of the user that is currently logged in.

    MzaaloRewards.getBalance()

## Sequence Flow
### mzaalo-auth

![]

