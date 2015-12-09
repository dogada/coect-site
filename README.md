# coect-site &mdash; simple singleton for communication between Coect applications

Provides `window.Site` that extends `riot-observable` and so can listen to and
trigger events.

Global `Site` is used for exchanging events between Coect applications. When an
application want to change the screen it sends `mount` event with component that
should be shown.

Coect applications can be mounted with any base path, i.e. same app can be
mounted to `/umedia` or `/`. Coect-applications should not hardcode urls inside
and use `url` function provided by web-site (see `coect-umedia` for an example).

Every application can extend it but should keep extensions inside own namespace.
For example `Site.account.logOut` or `Site.umedia.url.entry`.

Copyright (C) 2015 Dmytro V. Dogadailo

This program is free software; you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free Software
Foundation; either version 2 of the License, or (at your option) any later
version.
