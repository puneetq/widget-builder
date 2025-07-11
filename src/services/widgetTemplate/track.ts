import { readFileSync, writeFileSync } from 'fs';

import { log } from '../../messages';
const isDev = process.env.NODE_ENV !== 'production';
const filePath = (dir: string): string => `${dir}/widget${isDev ? '-dev' : ''}.yml`;
const isTracked = (dir: string): string | null => {
    try {
        const data = readFileSync(filePath(dir), 'utf-8');
        if (!data) {
            return null;
        }

        return data;
    } catch {
        return null;
    }
};

const startTracking = (dir: string, uuid: string) => {
    // eslint-disable-next-line no-useless-catch
    try {
        writeFileSync(filePath(dir), uuid);
        log.success('New publishes now will update instead of creating a new instance');
    } catch (e) {
        throw e;
    }
};

export default {
    isTracked,
    startTracking,
};
