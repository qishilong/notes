# Install MongoDB Community Edition on macOS[![img](https://qiniucloud.qishilong.space/images/202307121044571.svg)](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/#install-mongodb-community-edition-on-macos)



## NOTE

### MongoDB Atlas

[MongoDB Atlas](https://www.mongodb.com/atlas/database?tck=docs_server) is a hosted MongoDB service option in the cloud which requires no installation overhead and offers a free tier to get started.

## Overview[![img](https://qiniucloud.qishilong.space/images/202307121044571.svg)](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/#overview)

Use this tutorial to install MongoDB 6.0 Community Edition on macOS using the third-party [Homebrew](https://brew.sh/) package manager.

Starting with MongoDB 4.4.1, installing MongoDB via Homebrew also installs the [MongoDB Database Tools](https://www.mongodb.com/docs/database-tools/). See [Using the MongoDB Database Tools](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/#std-label-brew-installs-dbtools) for more information.

### MongoDB Version[![img](https://qiniucloud.qishilong.space/images/202307121044571.svg)](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/#mongodb-version)

This tutorial installs MongoDB 6.0 Community Edition. To install a different version of MongoDB Community, use the version drop-down menu in the upper-left corner of this page to select the documentation for that version.

## Considerations[![img](https://qiniucloud.qishilong.space/images/202307121044571.svg)](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/#considerations)

### Platform Support[![img](https://qiniucloud.qishilong.space/images/202307121044571.svg)](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/#platform-support)



## NOTE

### EOL Notice

-   MongoDB 5.0 Community Edition removes support for macOS 10.13

MongoDB 6.0 Community Edition supports macOS 10.14 or later.

See [Platform Support](https://www.mongodb.com/docs/manual/administration/production-notes/#std-label-prod-notes-supported-platforms) for more information.

### Production Notes[![img](https://qiniucloud.qishilong.space/images/202307121044571.svg)](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/#production-notes)

Before deploying MongoDB in a production environment, consider the [Production Notes](https://www.mongodb.com/docs/manual/administration/production-notes/) document which offers performance considerations and configuration recommendations for production MongoDB deployments.



## Install MongoDB Community Edition[![img](https://qiniucloud.qishilong.space/images/202307121044571.svg)](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/#install-mongodb-community-edition)



### Prerequisites[![img](https://qiniucloud.qishilong.space/images/202307121044571.svg)](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/#prerequisites)

Ensure your system meets each of the following prerequisites. You only need to perform each prerequisite step once on your system. If you have already performed the prerequisite steps as part of an earlier MongoDB installation using Homebrew, you can skip to the [installation procedure.](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/#std-label-install)

#### Install Xcode Command-Line Tools[![img](https://qiniucloud.qishilong.space/images/202307121044571.svg)](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/#install-xcode-command-line-tools)

Homebrew requires the Xcode command-line tools from Apple's Xcode.

-   Install the Xcode command-line tools by running the following command in your macOS Terminal:

    ```
    xcode-select --install
    ```

#### Install Homebrew[![img](https://qiniucloud.qishilong.space/images/202307121044571.svg)](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/#install-homebrew)

macOS does not include the Homebrew `brew` package by default.

-   Install `brew` using the official [Homebrew installation instructions](https://brew.sh/#install).



### Installing MongoDB 6.0 Community Edition[![img](https://qiniucloud.qishilong.space/images/202307121044571.svg)](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/#installing-mongodb-6.0-edition-edition)

Follow these steps to install MongoDB Community Edition using Homebrew's `brew` package manager. Be sure that you have followed the [installation prerequisites](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/#std-label-osx-prereq) above before proceeding.

1.  Tap the [MongoDB Homebrew Tap](https://github.com/mongodb/homebrew-brew) to download the official Homebrew formula for MongoDB and the Database Tools, by running the following command in your macOS Terminal:

    ```
    brew tap mongodb/brew
    ```

    If you have already done this for a previous installation of MongoDB, you can skip this step.

2.  To update Homebrew and all existing formulae:

    ```
    brew update
    ```

3.  To install MongoDB, run the following command in your macOS Terminal application:

    ```
    brew install mongodb-community@6.0
    ```



## TIP

Alternatively, you can specify a previous version of MongoDB if desired. You can also maintain multiple versions of MongoDB side by side in this manner.



## TIP

If you have previously installed an older version of the formula, you may encounter a ChecksumMismatchError. To resolve, see [Troubleshooting ChecksumMismatchError.](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/#std-label-troubleshooting-checksumerror)

The installation includes the following binaries:

-   The [`mongod`](https://www.mongodb.com/docs/manual/reference/program/mongod/#mongodb-binary-bin.mongod) server
-   The [`mongos`](https://www.mongodb.com/docs/manual/reference/program/mongos/#mongodb-binary-bin.mongos) sharded cluster query router
-   The MongoDB Shell, [`mongosh`](https://www.mongodb.com/docs/mongodb-shell/#mongodb-binary-bin.mongosh)

In addition, the installation creates the following files and directories at the location specified below, depending on your Apple hardware:

|                                                              | Intel Processor              | Apple Silicon Processor         |
| :----------------------------------------------------------- | :--------------------------- | :------------------------------ |
| [configuration file](https://www.mongodb.com/docs/manual/reference/configuration-options/) | `/usr/local/etc/mongod.conf` | `/opt/homebrew/etc/mongod.conf` |
| [`log directory`](https://www.mongodb.com/docs/manual/reference/configuration-options/#mongodb-setting-systemLog.path) | `/usr/local/var/log/mongodb` | `/opt/homebrew/var/log/mongodb` |
| [`data directory`](https://www.mongodb.com/docs/manual/reference/configuration-options/#mongodb-setting-storage.dbPath) | `/usr/local/var/mongodb`     | `/opt/homebrew/var/mongodb`     |

See [Apple's documentation](https://support.apple.com/en-us/HT211814) for the current list of Apple hardware using the Apple Silicon processor. You can also run the following command to check where `brew` has installed these files and directories:

```
brew --prefix
```

Starting with MongoDB 4.4.1, the installation also includes the [MongoDB Database Tools](https://www.mongodb.com/docs/database-tools/). See [Using the MongoDB Database Tools](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/#std-label-brew-installs-dbtools) for more information.



## Run MongoDB Community Edition[![img](https://qiniucloud.qishilong.space/images/202307121044571.svg)](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/#run-mongodb-community-edition)

>   注意：想要在后台运行 mongodb 数据库，需要在启动命令前加上 `sudo` ，同理，在关闭命令前也应该加上 `sudo` 

Follow these steps to run MongoDB Community Edition. These instructions assume that you are using the default settings.

You can run MongoDB as a macOS service using `brew`, or you can run MongoDB manually as a background process. It is recommended to run MongoDB as a macOS service, as doing so sets the correct system `ulimit` values automatically (see [ulimit settings](https://www.mongodb.com/docs/manual/reference/ulimit/#std-label-ulimit-settings) for more information).

-   To run MongoDB (i.e. the [`mongod`](https://www.mongodb.com/docs/manual/reference/program/mongod/#mongodb-binary-bin.mongod) process) **as a macOS service**, run:

    ```
    brew services start mongodb-community@6.0
    ```

    To stop a [`mongod`](https://www.mongodb.com/docs/manual/reference/program/mongod/#mongodb-binary-bin.mongod) running as a macOS service, use the following command as needed:

    ```
    brew services stop mongodb-community@6.0
    ```

-   To run MongoDB (i.e. the [`mongod`](https://www.mongodb.com/docs/manual/reference/program/mongod/#mongodb-binary-bin.mongod) process) **manually as a background process**, run:

    -   For macOS running Intel processors:

        ```
        mongod --config /usr/local/etc/mongod.conf --fork
        ```

    -   For macOS running on [Apple Silicon processors:](https://support.apple.com/en-us/HT211814)

        ```
        mongod --config /opt/homebrew/etc/mongod.conf --fork
        ```

    To stop a [`mongod`](https://www.mongodb.com/docs/manual/reference/program/mongod/#mongodb-binary-bin.mongod) running as a background process, connect to the [`mongod`](https://www.mongodb.com/docs/manual/reference/program/mongod/#mongodb-binary-bin.mongod) using [mongosh](https://www.mongodb.com/docs/mongodb-shell/), and issue the [`shutdown`](https://www.mongodb.com/docs/manual/reference/command/shutdown/#mongodb-dbcommand-dbcmd.shutdown) command as needed.

Both methods use the `mongod.conf` file created during the install. You can add your own MongoDB [configuration options](https://www.mongodb.com/docs/manual/reference/configuration-options/) to this file as well.



## NOTE

### macOS Prevents mongod From Opening

macOS may prevent [`mongod`](https://www.mongodb.com/docs/manual/reference/program/mongod/#mongodb-binary-bin.mongod) from running after installation. If you receive a security error when starting [`mongod`](https://www.mongodb.com/docs/manual/reference/program/mongod/#mongodb-binary-bin.mongod) indicating that the developer could not be identified or verified, do the following to grant [`mongod`](https://www.mongodb.com/docs/manual/reference/program/mongod/#mongodb-binary-bin.mongod) access to run:

-   Open *System Preferences*
-   Select the *Security and Privacy* pane.
-   Under the *General* tab, click the button to the right of the message about [`mongod`](https://www.mongodb.com/docs/manual/reference/program/mongod/#mongodb-binary-bin.mongod), labelled either **Open Anyway** or **Allow Anyway** depending on your version of macOS.

To verify that MongoDB is running, perform one of the following:

-   If you started MongoDB **as a macOS service**:

    ```
    brew services list
    ```

    You should see the service `mongodb-community` listed as `started`.

-   If you started MongoDB **manually as a background process**:

    ```
    ps aux | grep -v grep | grep mongod
    ```

    You should see your `mongod` process in the output.

You can also view the log file to see the current status of your `mongod` process: `/usr/local/var/log/mongodb/mongo.log`.

### Connect and Use MongoDB[![img](https://qiniucloud.qishilong.space/images/202307121044571.svg)](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/#connect-and-use-mongodb)

To begin using MongoDB, connect [`mongosh`](https://www.mongodb.com/docs/mongodb-shell/#mongodb-binary-bin.mongosh) to the running instance. From a new terminal, issue the following:

```
mongosh
```



## NOTE

### macOS Prevents mongosh From Opening

macOS may prevent [`mongosh`](https://www.mongodb.com/docs/mongodb-shell/#mongodb-binary-bin.mongosh) from running after installation. If you receive a security error when starting [`mongosh`](https://www.mongodb.com/docs/mongodb-shell/#mongodb-binary-bin.mongosh) indicating that the developer could not be identified or verified, do the following to grant [`mongosh`](https://www.mongodb.com/docs/mongodb-shell/#mongodb-binary-bin.mongosh) access to run:

-   Open *System Preferences*
-   Select the *Security and Privacy* pane.
-   Under the *General* tab, click the button to the right of the message about [`mongosh`](https://www.mongodb.com/docs/mongodb-shell/#mongodb-binary-bin.mongosh), labelled either **Open Anyway** or **Allow Anyway** depending on your version of macOS.

For information on CRUD (Create,Read,Update,Delete) operations, see:

-   [Insert Documents](https://www.mongodb.com/docs/manual/tutorial/insert-documents/)
-   [Query Documents](https://www.mongodb.com/docs/manual/tutorial/query-documents/)
-   [Update Documents](https://www.mongodb.com/docs/manual/tutorial/update-documents/)
-   [Delete Documents](https://www.mongodb.com/docs/manual/tutorial/remove-documents/)



## Using the MongoDB Database Tools[![img](https://qiniucloud.qishilong.space/images/202307121044571.svg)](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/#using-the-mongodb-database-tools)

Starting in MongoDB 4.4.1, installing MongoDB via `brew` also installs the MongoDB Database Tools.

The [MongoDB Database Tools](https://www.mongodb.com/docs/database-tools/) are a collection of command-line utilities for working with a MongoDB deployment, including data backup and import/export tools like [`mongoimport`](https://www.mongodb.com/docs/database-tools/mongoimport/#mongodb-binary-bin.mongoimport) and [`mongodump`](https://www.mongodb.com/docs/database-tools/mongodump/#mongodb-binary-bin.mongodump) as well as monitoring tools like [`mongotop`.](https://www.mongodb.com/docs/database-tools/mongotop/#mongodb-binary-bin.mongotop)

Once you have installed the MongoDB Server in the steps above, the Database Tools are available directly from the command line in your macOS Terminal application. For example you could run [`mongotop`](https://www.mongodb.com/docs/database-tools/mongotop/#mongodb-binary-bin.mongotop) against your running MongoDB instance by invoking it in your macOS Terminal like so:

```
mongotop
```

It should start up, connect to your running [`mongod`](https://www.mongodb.com/docs/manual/reference/program/mongod/#mongodb-binary-bin.mongod), and start reporting usage statistics.

See the [MongoDB Database Tools Documentation](https://www.mongodb.com/docs/database-tools/) for usage information for each of the Database Tools.

## Additional Information[![img](https://qiniucloud.qishilong.space/images/202307121044571.svg)](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/#additional-information)

### Localhost Binding by Default[![img](https://qiniucloud.qishilong.space/images/202307121044571.svg)](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/#localhost-binding-by-default)

By default, MongoDB launches with [`bindIp`](https://www.mongodb.com/docs/manual/reference/configuration-options/#mongodb-setting-net.bindIp) set to `127.0.0.1`, which binds to the localhost network interface. This means that the `mongod` can only accept connections from clients that are running on the same machine. Remote clients will not be able to connect to the `mongod`, and the `mongod` will not be able to initialize a [replica set](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-replica-set) unless this value is set to a valid network interface.

This value can be configured either:

-   in the MongoDB configuration file with [`bindIp`](https://www.mongodb.com/docs/manual/reference/configuration-options/#mongodb-setting-net.bindIp), or
-   via the command-line argument [`--bind_ip`](https://www.mongodb.com/docs/manual/reference/program/mongod/#std-option-mongod.--bind_ip)



## WARNING

Before binding to a non-localhost (e.g. publicly accessible) IP address, ensure you have secured your cluster from unauthorized access. For a complete list of security recommendations, see [Security Checklist](https://www.mongodb.com/docs/manual/administration/security-checklist/). At minimum, consider [enabling authentication](https://www.mongodb.com/docs/manual/administration/security-checklist/#std-label-checklist-auth) and [hardening network infrastructure.](https://www.mongodb.com/docs/manual/core/security-hardening/)

For more information on configuring [`bindIp`](https://www.mongodb.com/docs/manual/reference/configuration-options/#mongodb-setting-net.bindIp), see [IP Binding.](https://www.mongodb.com/docs/manual/core/security-mongodb-configuration/)



### Troubleshooting ChecksumMismatchError[![img](https://qiniucloud.qishilong.space/images/202307121044571.svg)](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/#troubleshooting-checksummismatcherror)

If you have previously installed an older version of the formula, you may encounter a `ChecksumMismatchError` resembling the following:

```
Error: An exception occurred within a child process:

  ChecksumMismatchError: SHA256 mismatch

Expected: c7214ee7bda3cf9566e8776a8978706d9827c1b09017e17b66a5a4e0c0731e1f

  Actual: 6aa2e0c348e8abeec7931dced1f85d4bb161ef209c6af317fe530ea11bbac8f0

 Archive: /Users/kay/Library/Caches/Homebrew/downloads/a6696157a9852f392ec6323b4bb697b86312f0c345d390111bd51bb1cbd7e219--mongodb-macos-x86_64-4.2.0.tgz

To retry an incomplete download, remove the file above.
```

To fix:

1.  Remove the downloaded `.tgz` archive.

2.  Retap the formula.

    ```
    brew untap mongodb/brew && brew tap mongodb/brew
    ```

3.  Retry the install.

    ```
    brew install mongodb-community@6.0
    ```