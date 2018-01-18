import os from 'os';

/* eslint-disable no-param-reassign */
const ipContainer = () => {
  const ip = {};
  const ipCached = [];

  ip.isLoopback = (addr) => {
    return /^(::f{4}:)?127\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})/
      .test(addr) ||
      /^fe80::1$/.test(addr) ||
      /^::1$/.test(addr) ||
      /^::$/.test(addr);
  };

  ip.loopback = (family) => {
    //
    // Default to `ipv4`
    //
    family = family ? family.toLowerCase() : 'ipv4';

    if (family !== 'ipv4' && family !== 'ipv6') {
      throw new Error('family must be ipv4 or ipv6');
    }

    return family === 'ipv4' ? '127.0.0.1' : 'fe80::1';
  };

  //
  // ### function address (name, family)
  // #### @name {string|'public'|'private'} **Optional** Name or security
  //      of the network interface.
  // #### @family {ipv4|ipv6} **Optional** IP family of the address (defaults
  //      to ipv4).
  //
  // Returns the address for the network interface on the current system with
  // the specified `name`:
  //   * String: First `family` address of the interface.
  //             If not found see `undefined`.
  //   * 'public': the first public ip address of family.
  //   * 'private': the first private ip address of family.
  //   * undefined: First address with `ipv4` or loopback address `127.0.0.1`.
  //
  ip.address = (name, family) => {
    const interfaces = os.networkInterfaces();
    //
    // Default to `ipv4`
    //
    family = family ? family.toLowerCase() : 'ipv4';

    //
    // If a specific network interface has been named,
    // return the address.
    //
    if (name && name !== 'private' && name !== 'public') {
      const res = interfaces[name].filter((details) => {
        const itemFamily = details.family.toLowerCase();
        return itemFamily === family;
      });
      if (res.length === 0) { return undefined; }
      return res[0].address;
    }

    const all = Object.keys(interfaces).map((nic) => {
      //
      // Note: name will only be `public` or `private`
      // when this is called.
      //
      const addresses = interfaces[nic].filter((details) => {
        details.family = details.family.toLowerCase();
        if (details.family !== family || ip.isLoopback(details.address)) {
          return false;
        } else if (!name) {
          return true;
        }

        return name === 'public' ? ip.isPrivate(details.address) :
          ip.isPublic(details.address);
      });

      return addresses.length ? addresses[0].address : undefined;
    }).filter(Boolean);

    return !all.length ? ip.loopback(family) : all[0];
  };

  ip.cachedLength = () => {
    return ipCached.length;
  };

  ip.addCached = (newIp) => {
    const isFilter = ipCached.filter(cachedIp => cachedIp === newIp);
    if (isFilter.length > 0) { return false; } // already access recently
    if (ipCached.length > 50) {
      ipCached.shift();
    }
    ipCached.push(newIp);
    return true;
  };
  return ip;
};

const ip = ipContainer();
export default ip;
