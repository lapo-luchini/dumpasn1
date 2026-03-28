#! /usr/bin/env node

import * as readline from 'readline'

const oids = []

let current = {
    oid: null,
    lines: [],
}

function sortByOID(a, b) {
    const len = Math.min(a.oid.length, b.oid.length)
    for (let i = 0; i < len; i++)
        if (a.oid[i] !== b.oid[i])
            return a.oid[i] - b.oid[i]
    return a.oid.length - b.oid.length
}

readline.createInterface({
    input:  process.stdin
}).on('line', function (s) {
    if (s[0] == '#' || s.length == 0){
        if (current.oid && s.length == 0) {
            oids.push(current)
            current = {
                oid: null,
                lines: [],
            }
        }
    }
    if (s.startsWith('OID = '))
        current.oid = s.slice(6).trim().split(/\s+/).map(Number)
    current.lines.push(s)
}).on('close', function () {
    oids.sort(sortByOID)
    for (let o of oids)
        for (let c of o.lines)
            console.log(c)
})
