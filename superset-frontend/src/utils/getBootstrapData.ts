/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import {BootstrapData} from 'src/types/bootstrapTypes';
import {DEFAULT_BOOTSTRAP_DATA} from 'src/constants';

let cachedBootstrapData: BootstrapData | null = null;

export default function getBootstrapData(): BootstrapData {
  if (cachedBootstrapData === null) {
    const appContainer = document.getElementById('app');
    const dataBootstrap = appContainer?.getAttribute('data-bootstrap');
    cachedBootstrapData = dataBootstrap
      ? JSON.parse(dataBootstrap)
      : DEFAULT_BOOTSTRAP_DATA;
  }
  // Add a fallback to ensure the returned value is always of type BootstrapData
  return cachedBootstrapData ?? DEFAULT_BOOTSTRAP_DATA;
}

let APPLICATION_ROOT_NO_TRAILING_SLASH = '';
try {
  APPLICATION_ROOT_NO_TRAILING_SLASH =
    getBootstrapData().common.application_root.replace(/\/$/, '');
} catch (e) {
  console.error(e);
}

let STATIC_ASSETS_PREFIX_NO_TRAILING_SLASH = '';
try {
  STATIC_ASSETS_PREFIX_NO_TRAILING_SLASH =
    getBootstrapData().common.static_assets_prefix.replace(/\/$/, '');
} catch (e) {
  console.error(e);
}

/**
 * @returns The configured application root
 */
export function applicationRoot(): string {
  return APPLICATION_ROOT_NO_TRAILING_SLASH;
}

/**
 * @returns The configured static assets prefix
 */
export function staticAssetsPrefix(): string {
  return STATIC_ASSETS_PREFIX_NO_TRAILING_SLASH;
}
