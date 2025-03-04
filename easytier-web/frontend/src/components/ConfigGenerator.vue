<script setup lang="ts">
import { ref } from 'vue';
import { NetworkTypes } from 'easytier-frontend-lib';
import { Api } from 'easytier-frontend-lib';

const defaultApiHost = '';
const api = new Api.ApiClient(defaultApiHost);

const newNetworkConfig = ref<NetworkTypes.NetworkConfig>(NetworkTypes.DEFAULT_NETWORK_CONFIG());
const toml_config = ref<string>('点击 运行网络 以生成 TOML 配置');

const generateConfig = (config: NetworkTypes.NetworkConfig) => {
    api.generate_config({ config }).then((res) => {
        toml_config.value = res.error || res.toml_config || 'API 服务器返回了一个意外的响应';
    });
};
</script>

<template>
    <div class="flex items-center justify-center m-5">
        <div class="flex w-full">
            <div class="w-1/2 p-4">
                <Config :cur-network="newNetworkConfig" @run-network="generateConfig" />
            </div>
            <div class="w-1/2 p-4 bg-gray-100">
                <pre class="whitespace-pre-wrap">{{ toml_config }}</pre>
            </div>
        </div>
    </div>
</template>
