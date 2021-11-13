import Verror from 'verror'
import i18n   from '../lib/i18n'

import { Context }               from 'telegraf'
import { Update, CallbackQuery } from 'telegraf/typings/core/types/typegram'

import makeRandom           from './commands/random'
import openInTelegraph      from './commands/open_in_telegraph'
import likeDoujin           from './commands/like'
import help, { searchTips } from './commands/help'
import settingsChanger      from './commands/settings/buttons_handler'

export default async function callbackHandler(ctx: Context<Update>, callback_query: CallbackQuery.DataCallbackQuery): Promise<void> {
	const data: string = callback_query.data
	if (data === 'r'){
		try {
			await makeRandom(ctx,'next')
		} catch (error) {
			throw new Verror(error, 'Handling Random:next button')
		}
	} else if (data === 'previous'){
		try {
			await makeRandom(ctx,'previous')
		} catch (error) {
			throw new Verror(error, 'Handling Random:previous button')
		}
	} else if (data.match('open')) {
		try {
			await openInTelegraph(ctx, data)
		} catch (error) {
			throw new Verror(error, 'Handling openInTelegraph')
		}
	} else if (data.match('like_')){
		try {
			await likeDoujin(ctx, callback_query)
		} catch (error) {
			throw new Verror(error, 'Handling like')
		}
	} else if (data === 'searchtips') {
		try {
			await searchTips(ctx)
		} catch (error) {
			throw new Verror(error, 'Showing search tips')
		}
	} else if (data === 'helpsearchback') {
		try {
			await help(ctx)
		} catch (error) {
			throw new Verror(error, 'Editing help')
		}
	} else if (data.startsWith('fix')) {
		try {
			await ctx.answerCbQuery(i18n.t('will_be_implemented_soon'))
		} catch (error) {
			throw new Verror(error, 'Answering CbQuery will_be_implemented_soon')
		}
	} else if (data.startsWith('sttgs_')) {
		try {
			await settingsChanger(ctx, callback_query)
		} catch (error) {
			throw new Verror(error, 'Editing settings')
		}
	}
	try {
		await ctx.answerCbQuery()
	} catch (error) {
		console.error('Answering callback query: ' + error.message)
	}
}