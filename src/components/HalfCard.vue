<script setup lang="ts">
import { AssetType, Assets } from '../core/asset';
import { Card, CardActionType, CardStatus } from '../core/card';
import EmojiIcon from './EmojiIcon.vue'
import { useI18n } from 'vue-i18n';

const emits = defineEmits<{
    action: [cardId: string, status: CardStatus, action: CardActionType]
}>();
const { t } = useI18n();

const props = defineProps<{ card: Card, status: CardStatus }>();

const MAP_ASSET_TYPE_TO_ICON = new Map([
    [AssetType.Fish, "🐟"],
    [AssetType.Log, "🪵"],
    [AssetType.Stone, "🪨"],
]);

const MAP_ACTION_TYPE_TO_ICON = new Map([
    [CardActionType.Pay, "⤵"],
    [CardActionType.Rotate, "🔃"],
    [CardActionType.Flip, "↩"],
]);

const ASSET_ORDER = [AssetType.Log, AssetType.Fish, AssetType.Stone];
function expandAssets(assets: Assets): Array<AssetType> {
    let t = [];
    for (let type of ASSET_ORDER) {
        for (let i = 0; i < (assets.assets[type] ?? 0); i++) {
            t.push(type);
        }
    }
    return t;
}

const actions = props.card.actions[props.status] ?? [];
</script>

<template>
    <div class="w-[100%] h-[100%] flex flex-col justify-start justify-items-center">
        <div class="h-1/3 flex flex-row flex-nowrap basis-1/8 self-center justify-self-start text-2xl">
            <span v-for="(item, item_index) in props.card.getAssets(status)?.group"
                class="flex flex-row flex-nowrap shrink justify-center justify-self-center">
                <span v-if="item_index > 0" class="text-center mx-1">
                    /
                </span>
                <span v-for="asset in expandAssets(item)">
                    <EmojiIcon :icon="MAP_ASSET_TYPE_TO_ICON.get(asset)!"></EmojiIcon>
                </span>
            </span>
        </div>
        <div class="flex flex-col">
            <div class="grid grid-flow-col justify-between justify-items-center bg-white">
                <EmojiIcon v-if="card.getStar(status) > 0" icon="⭐">{{ card.getStar(status) }}</EmojiIcon>
                <EmojiIcon v-else style="visibility: hidden;" icon="⭐">0</EmojiIcon>
                <span class="grow">{{ card.name }}</span>
                <EmojiIcon v-if="card.getLevel(status)" icon="⏫︎">{{ card.getLevel(status) }}</EmojiIcon>
                <EmojiIcon v-else style="visibility: hidden;" icon="⏫︎">0</EmojiIcon>
            </div>
            <div class="grid grid-flow-row auto-rows-max">
                <div v-for="action in actions.filter(x => x)" class="action-button flex flex-row justify-center space-x-3" 
                    @click="$emit('action', props.card.id, props.status, action.type)">
                    <EmojiIcon :icon="MAP_ACTION_TYPE_TO_ICON.get(action.type)!"></EmojiIcon>
                    <span v-if="action.cost.group.length > 0" class="flex flex-row justify-center justify-items-center">
                        <span v-for="(group, group_index) in action.cost.group" class="flex flex-row justify-center gap-2">
                            <span v-if="group_index > 0" class="text-bold text-center mx-1">
                                /
                            </span>
                            <span v-for="asset in ASSET_ORDER.filter(x => group.assets[x] > 0)">
                                <span v-if="(group.assets[asset] ?? 0) >= 1">
                                    {{ group.assets[asset] }}
                                    <EmojiIcon :icon="MAP_ASSET_TYPE_TO_ICON.get(asset)!"></EmojiIcon>
                                </span>
                            </span>
                        </span>
                    </span>
                    <span v-else>
                        {{ $t('card.base.free') }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="postcss">

.action-button {
    user-select: none;
}

.action-button:hover {
    @apply transition;
    transform: scale(1.2);
    cursor: grab;
}
        
.action-button:active {
    @apply transition;
    transform: scale(0.9);
    cursor: grabbing;
}
</style>
