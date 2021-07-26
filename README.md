# chubbyjs-container

[![CI](https://github.com/chubbyjs/chubbyjs-container/workflows/CI/badge.svg?branch=master)](https://github.com/chubbyjs/chubbyjs-container/actions?query=workflow%3ACI)
[![Coverage Status](https://coveralls.io/repos/github/chubbyjs/chubbyjs-container/badge.svg?branch=master)](https://coveralls.io/github/chubbyjs/chubbyjs-container?branch=master)
[![Infection MSI](https://badge.stryker-mutator.io/github.com/chubbyjs/chubbyjs-container/master)](https://dashboard.stryker-mutator.io/reports/github.com/chubbyjs/chubbyjs-container/master)

[![bugs](https://sonarcloud.io/api/project_badges/measure?project=chubbyjs_chubbyjs-container&metric=bugs)](https://sonarcloud.io/dashboard?id=chubbyjs_chubbyjs-container)
[![code_smells](https://sonarcloud.io/api/project_badges/measure?project=chubbyjs_chubbyjs-container&metric=code_smells)](https://sonarcloud.io/dashboard?id=chubbyjs_chubbyjs-container)
[![coverage](https://sonarcloud.io/api/project_badges/measure?project=chubbyjs_chubbyjs-container&metric=coverage)](https://sonarcloud.io/dashboard?id=chubbyjs_chubbyjs-container)
[![duplicated_lines_density](https://sonarcloud.io/api/project_badges/measure?project=chubbyjs_chubbyjs-container&metric=duplicated_lines_density)](https://sonarcloud.io/dashboard?id=chubbyjs_chubbyjs-container)
[![ncloc](https://sonarcloud.io/api/project_badges/measure?project=chubbyjs_chubbyjs-container&metric=ncloc)](https://sonarcloud.io/dashboard?id=chubbyjs_chubbyjs-container)
[![sqale_rating](https://sonarcloud.io/api/project_badges/measure?project=chubbyjs_chubbyjs-container&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=chubbyjs_chubbyjs-container)
[![alert_status](https://sonarcloud.io/api/project_badges/measure?project=chubbyjs_chubbyjs-container&metric=alert_status)](https://sonarcloud.io/dashboard?id=chubbyjs_chubbyjs-container)
[![reliability_rating](https://sonarcloud.io/api/project_badges/measure?project=chubbyjs_chubbyjs-container&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=chubbyjs_chubbyjs-container)
[![security_rating](https://sonarcloud.io/api/project_badges/measure?project=chubbyjs_chubbyjs-container&metric=security_rating)](https://sonarcloud.io/dashboard?id=chubbyjs_chubbyjs-container)
[![sqale_index](https://sonarcloud.io/api/project_badges/measure?project=chubbyjs_chubbyjs-container&metric=sqale_index)](https://sonarcloud.io/dashboard?id=chubbyjs_chubbyjs-container)
[![vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=chubbyjs_chubbyjs-container&metric=vulnerabilities)](https://sonarcloud.io/dashboard?id=chubbyjs_chubbyjs-container)

## Description

A minimal Dependency Injection Container (DIC) which implements PSR-11.

## Requirements

 * node: 12
 * [@chubbyjs/psr-container][2]: ^1.0

## Installation

Through [NPM](https://www.npmjs.com) as [@chubbyjs/chubbyjs-container][1].

```sh
npm i @chubbyjs/chubbyjs-container@1.0.7
```

## Usage

There are two PSR-11 implementations:

 * `Container` prototype (each get will return a new instance) and shared services
 * `MinimalContainer` shared services

### MinimalContainer / Container

#### Factories

```ts
import FactoryInterface from '@chubbyjs/chubbyjs-container/dist/FactoryInterface';
import Logger from 'some-logger/dist/Logger';
import MinimalContainer from '@chubbyjs/chubbyjs-container/dist/MinimalContainer';
import MyService from './Service/MyService';
import PsrContainerInterface from '@chubbyjs/psr-container/dist/ContainerInterface';

const container = new MinimalContainer();

container.factories(
    new Map<string, FactoryInterface>([
        [MyService.name, (container: PsrContainerInterface): MyService => {
            return new MyService(container.get<Logger>(Logger.name));
        }]
    ])
);
```

#### Factory

```ts
import FactoryInterface from '@chubbyjs/chubbyjs-container/dist/FactoryInterface';
import Logger from 'some-logger/dist/Logger';
import MinimalContainer from '@chubbyjs/chubbyjs-container/dist/MinimalContainer';
import MyService from './Service/MyService';
import PsrContainerInterface from '@chubbyjs/psr-container/dist/ContainerInterface';

const container = new MinimalContainer();

// new
container.factory(MyService.name, (container: PsrContainerInterface): MyService => {
    return new MyService(container.get<Logger>(Logger.name));
});

// existing (replace)
container.factory(MyService.name, (container: PsrContainerInterface): MyService => {
    return new MyService(container.get<Logger>(Logger.name));
});

// existing (extend)
container.factory(
    MyService.name,
    (container: PsrContainerInterface, previous?: FactoryInterface): MyService => {
        if (!previous) {
            throw 'Missing service';
        }

        const myService: MyService = previous(container);

        myService.setLogger(container.get<Logger>(Logger.name));

        return myService;
    }
);
```

#### Factory with Parameter

```ts
import MinimalContainer from '@chubbyjs/chubbyjs-container/dist/MinimalContainer';
import Parameter from '@chubbyjs/chubbyjs-container/dist/Parameter';

const container = new MinimalContainer();

container.factory('key', Parameter('value'));
```

#### Get

```ts
import MinimalContainer from '@chubbyjs/chubbyjs-container/dist/MinimalContainer';
import MyService from './Service/MyService';

const container = new MinimalContainer();

container.get<MyService>(MyService.name);
```

#### Has

```ts
import MinimalContainer from '@chubbyjs/chubbyjs-container/dist/MinimalContainer';
import MyService from './Service/MyService';

const container = new MinimalContainer();

container.has(MyService.name);
```

### Container

All methods of the `MinimalContainer` and the following:

#### Prototype Factories

**each get will return a new instance**

```ts
import Container from '@chubbyjs/chubbyjs-container/dist/Container';
import FactoryInterface from '@chubbyjs/chubbyjs-container/dist/FactoryInterface';
import Logger from 'some-logger/dist/Logger';
import MyService from './Service/MyService';
import PsrContainerInterface from '@chubbyjs/psr-container/dist/ContainerInterface';

const container = new Container();

container.prototypeFactories(
    new Map<string, FactoryInterface>([
        [MyService.name, (container: PsrContainerInterface): MyService => {
            return new MyService(container.get<Logger>(Logger.name));
        }]
    ])
);
```

#### Prototype Factory

**each get will return a new instance**

```ts
import Container from '@chubbyjs/chubbyjs-container/dist/Container';
import FactoryInterface from '@chubbyjs/chubbyjs-container/dist/FactoryInterface';
import Logger from 'some-logger/dist/Logger';
import MyService from './Service/MyService';
import PsrContainerInterface from '@chubbyjs/psr-container/dist/ContainerInterface';

const container = new Container();

// new
container.prototypeFactory(
    MyService.name,
    (container: PsrContainerInterface): MyService => {
        return new MyService(container.get<Logger>(Logger.name));
    }
);

// existing (replace)
container.prototypeFactory(
    MyService.name,
    (container: PsrContainerInterface): MyService => {
        return new MyService(container.get<Logger>(Logger.name));
    }
);

// existing (extend)
container.prototypeFactory(
    MyService.name,
    (container: PsrContainerInterface, previous?: FactoryInterface): MyService => {
        if (!previous) {
            throw 'Missing service';
        }

        const myService: MyService = previous(container);

        myService.setLogger(container.get<Logger>(Logger.name));

        return myService;
    }
);
```

## Copyright

Dominik Zogg 2021

[1]: https://www.npmjs.com/package/@chubbyjs/chubbyjs-container

[2]: https://www.npmjs.com/package/@chubbyjs/psr-container
